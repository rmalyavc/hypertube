import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var RegisterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RegisterComponent, _super);
    function RegisterComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.form_data = {
            login: '',
            password: '',
            password_confirmation: '',
            email: '',
            lang: ''
        };
        return _this;
    }
    RegisterComponent.prototype.ngOnInit = function (res) {
        if (res === void 0) { res = false; }
        this.form_data.lang = this.page_lang;
        this.result = res;
        this.get_mod_strings('application');
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.result = this.user_service.register_user(this.form_data).subscribe(function (data) {
            if (data.errors) {
                var tmp;
                var keys = Object.keys(data.errors);
                for (var i = 0; i < keys.length; i++) {
                    for (var j = 0; j < data.errors[keys[i]].length; j++) {
                        tmp = data.errors[keys[i]][j];
                        _this.errors.push(tmp);
                    }
                }
            }
            _this.ngOnInit(data);
        }, function (error) {
            _this.handle_request_error();
        });
    };
    RegisterComponent = tslib_1.__decorate([
        Component({
            selector: '.app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}(BaseComponent));
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map