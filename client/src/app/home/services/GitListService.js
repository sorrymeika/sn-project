import { observable } from "snowball";
import { Service } from "snowball/app";

export default class GitListService extends Service {
    @observable gitList;

    onToEdit = this.ctx.createEvent();

    constructor(projectService, gitModalService) {
        super();

        this.projectService = projectService;
        this.gitModalService = gitModalService;

        this.onToEdit((data) => {
            this.gitModalService.show(data);
        });

        this.gitModalService.onSuccess(() => {
            this.load();
        });
    }

    init() {
        this.load();
    }

    load() {
        this.projectService.getGits()
            .then(res => {
                this.gitList = res.data;
            });
    }
}