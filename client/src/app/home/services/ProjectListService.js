import { observable } from "snowball";
import { Service } from "snowball/app";

export default class ProjectListService extends Service {
    @observable projectList;

    @observable publishingProject;

    onPublish = this.ctx.createEvent();
    onShowLog = this.ctx.createEvent();
    onToEdit = this.ctx.createEvent();

    constructor(projectService, projectModalService, projectLogService) {
        super();

        this.projectService = projectService;
        this.projectModalService = projectModalService;
        this.projectLogService = projectLogService;

        this.onToEdit((project) => {
            this.projectModalService.show(project);
        });
        this.projectModalService.onSuccess(() => {
            this.load();
        });
        this.onShowLog((project) => {
            this.projectLogService.show(project);
        });
        this.onPublish((project) => this.publish(project));
        this.projectLogService.onDidPublish((project) => this.publish(project));
    }

    init() {
        this.load();
    }

    load() {
        this.projectService.getProjects()
            .then(res => {
                this.projectList = res.data;
            });
    }

    publish(project) {
        const projectId = project.id;

        this.projectService.buildProject(projectId)
            .then(res => {
                this.projectList.find(proj => proj.id === projectId)
                    .withMutations((project) => {
                        project.set({ status: 2 });
                    });
            });
    }
}