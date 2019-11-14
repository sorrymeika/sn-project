import { observable } from "snowball";
import { Service } from "snowball/app";

export default class ProjectLogService extends Service {
    @observable isModalVisible = false;
    @observable logs = [];
    @observable running = false;
    @observable success = false;
    @observable currentProject;

    onCancel = this.ctx.createEvent();
    onDoPublish = this.ctx.createEvent();
    onDidPublish = this.ctx.createEvent();

    constructor(projectService) {
        super();

        this.projectService = projectService;

        this.onCancel(() => {
            this.hide();
        });

        this.onDoPublish(() => {
            this.onDidPublish.emit(this.currentProject);
            this.startPolling();
        });
    }

    startPolling() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.polling();
        }, 1000);
    }

    polling() {
        this.pullLogs()
            .then(() => {
                this.timeout = null;
                if (this.running) {
                    this.startPolling();
                }
            });
    }

    pullLogs() {
        return this.projectService.getBuildingInfo(this.currentProject.id)
            .then(res => {
                this.running = res.data.running;
                this.success = res.data.success;
                this.logs = res.data.logs;
                return res;
            });
    }

    show(project) {
        this.currentProject = project;
        this.isModalVisible = true;
        this.polling();
    }

    hide() {
        this.isModalVisible = false;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
}