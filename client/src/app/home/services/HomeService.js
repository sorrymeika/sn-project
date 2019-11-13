import { Service } from "snowball/app";

export default class HomeService extends Service {
    constructor(projectService) {
        super();

        this.projectService = projectService;
    }

    init() {
    }
}