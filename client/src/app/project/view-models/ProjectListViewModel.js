import { observable } from "snowball";
import { autowired, emitter, ViewModel } from "snowball/app";

export default class ProjectListViewModel extends ViewModel {
    @observable
    projectList;

    @autowired
    projectApiService;

    @autowired
    _projectLogViewModel;

    @autowired
    projectModalViewModel;

    constructor() {
        super();

        this.projectModalViewModel.onSuccess(() => {
            this.load();
        });
        this._projectLogViewModel.onDidPublish((project) => this.publish(project));
    }

    @emitter
    onToEdit(project) {
        this.projectModalViewModel.show(project);
    }

    @emitter
    onPublish(project) {
        this.publish(project);
    }

    @emitter
    onShowLog(project) {
        this._projectLogViewModel.show(project);
    }

    init() {
        this.load();
    }

    load() {
        this.projectApiService.getProjects()
            .then(res => {
                this.projectList = res.data;
            });
    }

    publish(project) {
        const projectId = project.id;

        this.projectApiService.buildProject(projectId)
            .then(res => {
                this.projectList.find(proj => proj.id === projectId)
                    .withMutations((project) => {
                        project.set({ status: 2 });
                    });
            });
    }
}