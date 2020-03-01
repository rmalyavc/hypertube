import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var LoginComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LoginComponent, _super);
    function LoginComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.form_data = {
            login: '',
            password: ''
        };
        return _this;
    }
    // private success: boolean;
    LoginComponent.prototype.ngOnInit = function () {
        this.get_mod_strings('application');
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.form_data['login'] && this.form_data['password']) {
            this.user_service.login_user(this.form_data).subscribe(function (res) {
                if (res.status === true) {
                    res.data.token = res.token;
                    res.data.id = res.data.uid;
                    localStorage.setItem('current_user', JSON.stringify(res.data));
                    _this.page_lang = res.data.lang;
                    _this.redirect_to_home(true);
                }
                else {
                    console.log(res);
                    _this.form_data = {
                        login: '',
                        password: ''
                    };
                    _this.success = false;
                    _this.errors.push(_this.app_strings['LBL_LOGIN_FAILED']);
                    _this.handle_request_error(false, (res.error == '401' && _this.app_strings['LBL_INVALID_LOGIN_PASSWORD']) || _this.app_strings['LBL_ERR_' + res.error] || _this.app_strings.LBL_ERR_500);
                }
            }, function (error) {
                _this.handle_request_error();
            });
        }
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: '.app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}(BaseComponent));
export { LoginComponent };
//# sourceMappingURL=login.component.js.map