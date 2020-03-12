const childProcess = require('child_process');

module.exports = {

    execCommand(command, args, options, progress) {
        return new Promise((resolve) => {
            console.log(`start exec command: '${[command, ...args].join(' ')}'`);

            const cmd = childProcess.spawn(command, args, options);

            cmd.stdout.on('data', (data) => {
                const text = data.toString('utf8');
                console.log(text);
                progress && progress({
                    type: 'data',
                    data: text
                });
            });

            cmd.stderr.on('data', (data) => {
                const text = data.toString('utf8');
                console.log(text);
                progress && progress({
                    type: 'error',
                    data: text
                });
            });

            cmd.on('close', (code) => {
                console.log(`exec command '${[command, ...args].join(' ')}' exited with code ${code}`);
                resolve(code);
            });
        });
    }
};