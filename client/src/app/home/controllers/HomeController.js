import { controller, autowired } from "snowball/app";
import Home from "../containers/Home";

@controller(Home)
class HomeController {
    @autowired
    projectListViewModel;

    onInit() {
        this.projectListViewModel.init();
    }
}

export default HomeController;
