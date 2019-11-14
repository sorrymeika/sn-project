
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const fsPromises = fs.promises;

function createBuilder(project, app) {
    let logs = [];
    const { id: projectId, path: projectPath } = project;

    function log(...args) {
        logs.push(args.join(' '));
        console.log(...args);
    }

    function flushLogs() {
        const res = logs;
        logs = [];
        return res;
    }

    function getLogs() {
        return logs;
    }

    async function doAutoConfig(autoConfig, buildFn) {
        const packageJson = JSON.parse(await fsPromises.readFile(path.join(projectPath, 'package.json'), 'utf-8'));

        log('start autoconfig!');

        const tempFileSuffix = ".snbuild.tmp";
        const config = {
            version: packageJson.version
        };

        const replacements = await Promise.all(autoConfig.map((conf) => {
            return new Promise((resolve, reject) => {
                fs.readFile(conf.template, 'utf-8', (err, text) => {
                    if (err) return reject(err);

                    text = text.replace(/\${(\w+?)}/g, (match, key) => {
                        return config[key];
                    });
                    const destFile = conf.destFile;
                    const tempFile = destFile + tempFileSuffix;

                    fs.copyFile(destFile, tempFile, (err) => {
                        if (err) return reject(err);

                        fs.writeFile(destFile, text, 'utf8', (err) => {
                            if (err) return reject(err);

                            resolve({
                                destFile,
                                tempFile
                            });
                        });
                    });
                });
            });
        }));

        await buildFn();

        log('clear temp files!');

        // 恢复原文件并删除临时文件
        await Promise.all(replacements.map(({ destFile, tempFile }) => {
            return new Promise((resolve, reject) => {
                fs.copyFile(tempFile, destFile, (err) => {
                    if (err) return reject(err);

                    fs.unlink(tempFile, (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            });
        }));
    }

    function execCommand(command, args, options) {
        return new Promise((resolve) => {
            log(`start exec command: '${[command, ...args].join(' ')}'`);

            const cmd = childProcess.spawn(command, args, {
                cwd: projectPath,
                ...options
            });

            cmd.stdout.on('data', (data) => {
                log(data.toString('utf8'));
            });

            cmd.stderr.on('data', (data) => {
                log(data.toString('utf8'));
            });

            cmd.on('close', (code) => {
                log(`exec command '${[command, ...args].join(' ')}' exited with code ${code}`);
                resolve();
            });
        });
    }

    let running = false;
    let success;

    async function buildProject() {
        if (running) return;
        running = true;
        success = false;
        logs = ['start build!'];

        await app.mysql.query('update project set status=2 where id=?', [projectId]);

        await execCommand('git', ['pull']);

        const buildConfigJson = JSON.parse(await fsPromises.readFile(path.join(projectPath, 'build-config/config.json'), 'utf-8'));

        log('read `build-config/config.json`!', JSON.stringify(buildConfigJson));

        const buildCommands = buildConfigJson.buildCommands;
        const autoConfig = buildConfigJson.autoConfig.map(({ template, destFile }) => {
            return {
                template: path.join(projectPath, 'build-config/', template),
                destFile: path.join(projectPath, destFile)
            };
        });

        await doAutoConfig(autoConfig, async () => {
            log('exec build commands!');

            for (let i = 0; i < buildCommands.length; i++) {
                const commandArgs = buildCommands[i].split(/\s+/);
                const command = commandArgs.shift();

                await execCommand(command, commandArgs);
            }

            log('exec build commands finish!');
        });

        log('build finish!');
        running = false;
        success = true;
        await app.mysql.query('update project set status=1 where id=?', [projectId]);
    }

    return {
        build: () => {
            return buildProject()
                .catch(async e => {
                    log(e.message);

                    await app.mysql.query('update project set status=3 where id=?', [projectId]);

                    running = false;
                    success = false;
                });
        },
        flushLogs,
        getLogs,
        get running() {
            return running;
        },
        get success() {
            return success;
        }
    };
}

exports.createBuilder = createBuilder;