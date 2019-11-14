import { Service } from "snowball/app";

export default class ProjectService extends Service {
    getGits() {
        return this.app.server.post('/project/getGits');
    }

    createGit(data) {
        return this.app.server.post('/project/createGit', data);
    }

    getProjects() {
        return this.app.server.post('/project/getProjects');
    }

    buildProject(projectId) {
        return this.app.server.post('/project/buildProject', {
            projectId
        });
    }

    getBuildingInfo(projectId) {
        return this.app.server.post('/project/getBuildingInfo', {
            projectId
        });
    }
}