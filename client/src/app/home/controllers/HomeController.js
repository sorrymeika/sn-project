import { controller, injectable } from "snowball/app";
import ProjectService from "../../shared/services/ProjectService";
import HomeService from "../services/HomeService";
import ProjectListService from "../services/ProjectListService";

import Home from "../containers/Home";
import ProjectLogService from "../services/ProjectLogService";


@controller(Home)
class HomeController {
    @injectable homeService;
    @injectable projectListService;
    @injectable projectLogService;

    constructor(props, context) {
        this.homeService = new HomeService();

        this.projectService = new ProjectService();

        this.projectLogService = new ProjectLogService(this.projectService);

        this.projectListService = new ProjectListService(
            this.projectService,
            this.projectLogService
        );
    }

    onInit() {
        this.projectListService.init();
    }
}

export default HomeController;
