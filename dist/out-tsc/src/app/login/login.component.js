import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var LoginComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LoginComponent, _super);
    function LoginComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.form_data = {
            login: '',
            password: ''
        };
    };
    LoginComponent.prototype.login = function () {
        console.log(this.form_data);
        if (this.form_data['login'] && this.form_data['password']) {
            this.user_service.get_current_user().subscribe(function (data) {
                localStorage.setItem('current_user', JSON.stringify(data["42"]));
            });
            this.redirect_to_home(true);
            // this.user_service.login_user(this.form_data).subscribe(data => {
            // 	console.log(data);
            // 	if (data.success === true) {
            // 		delete data['success'];
            // 		localStorage.setItem('current_user', JSON.stringify(data));
            // 		this.redirect_to_home(true);
            // 	}
            // 	else {
            // 		this.form_data = {
            // 			login: '',
            // 			password: ''
            // 		}
            // 		this.success = false;
            // 	}
            // });
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