
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const fsPromises = fs.promises;

function createBuilder(projectPath) {
    let logs = [];

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

        const tempFileSuffix = ".snbuild.tmp";
        const config = {
            version: packageJson.version
        };

        const replacements = await Promise.all(autoConfig.map((conf) => {
            return new Promise((resolve) => {
                fs.readFile(conf.template, 'utf-8', (err, text) => {
                    text = text.replace(/\${(\w+?)}/g, (match, key) => {
                        return config[key];
                    });
                    const destFile = conf.destFile;
                    const tempFile = destFile + tempFileSuffix;

                    fs.copyFile(destFile, tempFile, (err) => {
                        resolve({
                            destFile,
                            tempFile
                        });
                    });
                });
            });
        }));

        await buildFn();

        // 恢复原文件并删除临时文件
        await Promise.all(replacements.map(({ destFile, tempFile }) => {
            return new Promise((resolve, reject) => {
                fs.copyFile(tempFile, destFile, (err) => {
                    fs.unlink(tempFile, (err) => {
                        resolve();
                    });
                });
            });
        }));
    }

    let running = false;
    let success;

    async function buildProject() {
        if (running) return;
        running = true;
        success = false;
        logs = ['start build!'];

        const buildConfigJson = JSON.parse(await fsPromises.readFile(path.join(projectPath, 'build-config/config.json'), 'utf-8'));
        const buildCommands = buildConfigJson.buildCommands;
        const autoConfig = buildConfigJson.autoConfig.map(({ template, destFile }) => {
            return {
                template: path.join(projectPath, template),
                destFile: path.join(projectPath, destFile)
            };
        });

        await doAutoConfig(projectPath, autoConfig, async () => {
            function execCommand(command, args, options) {
                return new Promise((resolve) => {
                    const cmd = childProcess.spawn(command, args, {
                        cwd: projectPath,
                        ...options
                    });

                    cmd.stdout.on('data', (data) => {
                        log(data.toString('utf8'));
                    });

                    cmd.stderr.on('data', (data) => {
                        log(data.toString('utf8'));
                        reject();
                    });

                    cmd.on('close', (code) => {
                        log(`exec command exited with code ${code}`);
                        resolve();
                    });
                });
            }

            await execCommand('git', 'pull');

            for (let i = 0; i < buildCommands.length; i++) {
                const commandArgs = buildCommands[i].join(/\s+/);
                const command = commandArgs.shift();

                await execCommand(command, commandArgs);
            }
        });

        logs = ['build finish!'];
        running = false;
        success = true;
    }

    return {
        build: () => {
            return buildProject()
                .catch(e => {
                    running = false;
                    success = false;
                    log(e.message);
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