import { Service } from "snowball/app";

export default class ProjectService extends Service {
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