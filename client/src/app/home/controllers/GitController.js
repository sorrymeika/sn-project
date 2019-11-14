import { controller, injectable } from "snowball/app";
import ProjectService from "../../shared/services/ProjectService";

import GitModalService from "../services/GitModalService";
import GitListService from "../services/GitListService";

import Git from "../containers/Git";

@controller(Git)
class GitController {
    @injectable gitListService;
    @injectable gitModalService;

    constructor(props, context) {
        this.projectService = new ProjectService();

        this.gitModalService = new GitModalService(this.projectService);

        this.gitListService = new GitListService(
            this.projectService,
            this.gitModalService
        );
    }

    onInit() {
        this.gitListService.init();
    }
}

export default GitController;
