import { controller, injectable } from "snowball/app";
import ProjectService from "../../shared/services/ProjectService";
import HomeService from "../services/HomeService";
import ProjectListService from "../services/ProjectListService";

import Home from "../containers/Home";
import ProjectLogService from "../services/ProjectLogService";
import ProjectModalService from "../services/ProjectModalService";


@controller(Home)
class HomeController {
    @injectable homeService;
    @injectable projectListService;
    @injectable projectModalService;
    @injectable projectLogService;

    constructor(props, context) {
        this.homeService = new HomeService();

        this.projectService = new ProjectService();

        this.projectModalService = new ProjectModalService(this.projectService);
        this.projectLogService = new ProjectLogService(this.projectService);

        this.projectListService = new ProjectListService(
            this.projectService,
            this.projectModalService,
            this.projectLogService
        );
    }

    onInit() {
        this.projectListService.init();
    }
}

export default HomeController;
