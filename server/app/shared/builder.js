
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const fsPromises = fs.promises;

function createBuilder(projectPath, autoConfig) {
    autoConfig = autoConfig.map(({ template, destFile }) => {
        return {
            template: path.join(projectPath, template),
            destFile: path.join(destFile, template)
        };
    });

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

        console.log(config, replacements);
    }

    async function buildProject() {
        await doAutoConfig(projectPath, autoConfig, async () => {
            function execCommand(command, args, options) {
                const cmd = childProcess.spawn(command, args, options);
                cmd.stdout.on('data', (data) => {
                    log(data.toString('utf8'));
                });

                cmd.stderr.on('data', (data) => {
                    log(data.toString('utf8'));
                });

                cmd.on('close', (code) => {
                    log(`child process exited with code ${code}`);
                });
            }
        });
    }

    return {
        buildProject,
        flushLogs
    };
}

exports.createBuilder = createBuilder;