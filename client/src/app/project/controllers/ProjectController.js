import { controller, autowired } from "snowball/app";
import Project from "../containers/Project";
import { ProjectConfiguration } from "../configuration";

@controller({
    component: Project,
    configuration: ProjectConfiguration
})
export default class ProjectController {
    @autowired
    _projectListViewModel;

    onInit() {
        this._projectListViewModel.init();
    }
}