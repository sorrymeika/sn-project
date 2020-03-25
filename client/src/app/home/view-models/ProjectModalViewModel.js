import { observable, asObservable } from "snowball";
import { emitter, autowired, ViewModel } from "snowball/app";
import { message } from "antd";

export default class ProjectModalViewModel extends ViewModel {
    @observable isModalVisible = false;
    @observable formData = {};

    @autowired
    projectApiService;

    @emitter
    onFieldsChange(data) {
        asObservable(this.formData)
            .set(data);
    }

    @emitter
    onCancel() {
        this.hide();
    }

    @emitter
    onSubmit(data) {
        this.submit(data);
    }

    onSuccess = this.ctx.createEmitter();

    show(data = {}) {
        this.formData = data;
        this.isModalVisible = true;
    }

    hide() {
        this.isModalVisible = false;
    }

    async submit(data) {
        if (!data.id) {
            await this.projectApiService.addProject(data)
                .then(res => {
                    message.success('创建成功');
                    this.onSuccess.emit(data);
                    this.hide();
                })
                .catch(e => {
                    message.error('创建失败');
                });
        } else {
            console.log(data);
        }
    }
}