import { Service } from "snowball/app";

export default class HomeService extends Service {
    onToGit = this.ctx.createEvent();

    constructor() {
        super();

        this.onToGit(() => {
            this.app.navigation.forward('/git');
        });
    }
}