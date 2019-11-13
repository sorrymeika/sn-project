const { Service } = require("egg");

class ProjectNotExistsError extends Error {
    code = 'project_not_exists'

    constructor(message) {
        super(message);

        if (!message) {
            this.message = '项目不存在';
        }
    }
}

class ProjectService extends Service {
    async getProjects() {
        const rows = await this.app.mysql.query('select id,name,path,type from project');
        return rows;
    }

    async buildProject(projectId) {
        const rows = await this.app.mysql.query('select id,name,path,type from project where id=?', [projectId]);
        if (!rows.length) throw new ProjectNotExistsError();
        
        const project = rows[0];
        const builder = this.app.getBuilder(project);
    }
}

module.exports = ProjectService;
