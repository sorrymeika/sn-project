import { autowired, emitter, ViewModel } from "snowball/app";
import { message } from "antd";
import { IUserService } from "../../../shared/types";

export default class SignInViewModel extends ViewModel {
    @autowired
    _userService: IUserService;

    @emitter
    onSignIn(data) {
        this.signIn(data);
    }

    async signIn({ account, password }) {
        try {
            const res = await this._userService.signIn({
                account,
                password,
                appId: 1000
            });
            this._userService.storeAccountId(res.accountId);
            this._userService.loadMyAccount();
            this.ctx.navigation.replace('/');
        } catch (e) {
            message.error(e.message || '网络异常');
        }
    }
}
