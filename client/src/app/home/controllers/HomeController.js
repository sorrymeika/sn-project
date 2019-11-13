import { controller, injectable } from "snowball/app";
import Home from "../containers/Home";

@controller(Home)
class HomeController {
    // constructor({ location }, context) {
    // }

    onInit() {
        console.log(this.ctx.service.user);
    }
}

export default HomeController;
