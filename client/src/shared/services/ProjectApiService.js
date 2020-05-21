import { Service, autowired } from "snowball/app";

export default class ProjectApiService extends Service {
    @autowired
    _server;

    getGits() {
        return this._server.post('/project/getGits');
    }

    createGit(data) {
        return this._server.post('/project/createGit', data);
    }

    getProjects() {
        return this._server.post('/project/getProjects');
    }

    addProject(data) {
        return this._server.post('/project/addProject', data);
    }

    deleteProject(projectId) {
        return this._server.post('/project/deleteProject', {
            projectId
        });
    }

    buildProject(projectId) {
        return this._server.post('/project/buildProject', {
            projectId
        });
    }

    getBuildingInfo(projectId) {
        return this._server.post('/project/getBuildingInfo', {
            projectId
        });
    }
}