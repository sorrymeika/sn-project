const { Controller } = require("egg");
const path = require("path");

class ProjectController extends Controller {
    async restart() {
        const { ctx, app } = this;
        const serverPath = path.join(app.baseDir, '../server');
        await app.execCommand('npm', ['stop'], {
            cwd: serverPath
        });
        await app.execCommand('npm', ['start'], {
            cwd: serverPath
        });
        ctx.body = {
            success: true
        };
    }
}

module.exports = ProjectController;
