import { observable } from "snowball";
import { Service } from "snowball/app";
import { message } from "antd";

export default class GitModalService extends Service {
    @observable isModalVisible = false;
    @observable formData = {};

    onFieldsChange = this.ctx.createEvent();
    onCancel = this.ctx.createEvent();
    onSubmit = this.ctx.createAsyncEvent();
    onSuccess = this.ctx.createEvent();

    constructor(projectService, gitModalService) {
        super();

        this.projectService = projectService;
        this.gitModalService = gitModalService;

        this.onFieldsChange((data) => {
            this.formData.withMutations((formData) => {
                formData.set(data);
            });
        });

        this.onCancel(() => this.hide());
        this.onSubmit((data) => this.submit(data));
    }

    show(data = {}) {
        this.formData = data;
        this.isModalVisible = true;
    }

    hide() {
        this.isModalVisible = false;
    }

    async submit(data) {
        if (!data.id) {
            await this.projectService.createGit(data)
                .then(res => {
                    message.success('创建成功');
                    this.onSuccess.emit();
                    this.hide();
                })
                .catch(e => {
                    message.success('创建失败');
                });
        } else {
            console.log(data);
        }
    }
}