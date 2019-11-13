import { controller, injectable } from "snowball/app";
import Home from "../containers/Home";
import HomeService from "../services/HomeService";

@controller(Home)
class HomeController {
    @injectable homeService;

    constructor(props, context) {
        this.homeService = new HomeService();
    }

    onInit() {
        this.homeService.init();
    }
}

export default HomeController;
