const { Service } = require("egg");

class ProjectNotExistsError extends Error {
    constructor(message) {
        super(message);
        this.code = 'project_not_exists';

        if (!message) {
            this.message = '项目不存在';
        }
    }
}

class ProjectService extends Service {
    async getGits() {
        const rows = await this.app.mysql.query('select id,name,gitUrl,rootPath,status from git');
        return rows;
    }

    async createGit({
        name,
        gitUrl,
        rootPath
    }) {
        const { app } = this;
        const exists = await app.mysql.query('select id from git where gitUrl=? limit 1', [gitUrl]);
        if (exists && exists[0]) {
            throw new Error('git库已存在！');
        }

        const res = await app.mysql.insert('git', {
            name,
            gitUrl,
            rootPath,
            status: 2
        });

        const gitId = res.insertId;

        const progress = (e) => {
            app.mysql.query('update git set log=concat_ws(\'\',log,?) where id=?', [e.data + "\n", gitId]);
        };

        app.execCommand('git', ['clone', gitUrl], {
            cwd: rootPath
        }, progress)
            .then(() => {
                app.mysql.query('update git set status=1 where id=?', [gitId]);
            })
            .catch(() => {
                app.mysql.query('update git set status=3 where id=?', [gitId]);
            });

        return res;
    }

    async getProjects() {
        const rows = await this.app.mysql.query('select id,name,path,type,status from project');
        return rows;
    }

    async buildProject(projectId) {
        const rows = await this.app.mysql.query('select id,name,path,type from project where id=?', [projectId]);
        if (!rows.length) throw new ProjectNotExistsError();

        const project = rows[0];
        const builder = this.app.getBuilder(project);

        project.status = 2;

        builder.build();
    }

    async getBuildingInfo(projectId) {
        const rows = await this.app.mysql.query('select id,name,path,type from project where id=?', [projectId]);
        if (!rows.length) throw new ProjectNotExistsError();

        const project = rows[0];
        const builder = this.app.getBuilder(project);

        return {
            running: builder.running,
            success: builder.success,
            logs: builder.getLogs()
        };
    }
}

module.exports = ProjectService;
