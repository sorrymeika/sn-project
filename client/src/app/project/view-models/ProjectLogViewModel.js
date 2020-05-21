import { observable } from "snowball";
import { emitter, autowired, ViewModel } from "snowball/app";

export default class ProjectLogViewModel extends ViewModel {
    @observable isModalVisible = false;
    @observable logs = [];
    @observable running = false;
    @observable success = false;
    @observable currentProject;

    onDidPublish = this.ctx.createEmitter();

    @autowired
    projectApiService;

    @emitter
    onCancel() {
        this.hide();
    }

    @emitter
    onDoPublish() {
        this.onDidPublish.emit(this.currentProject);
        this.startPolling();
    }

    startPolling() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.timeout = null;
            this.polling();
        }, 1000);
    }

    polling() {
        this.pullLogs()
            .then(() => {
                if (this.running) {
                    this.startPolling();
                }
            });
    }

    pullLogs() {
        return this.projectApiService.getBuildingInfo(this.currentProject.id)
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