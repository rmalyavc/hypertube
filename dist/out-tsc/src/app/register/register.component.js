import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var RegisterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RegisterComponent, _super);
    function RegisterComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegisterComponent.prototype.ngOnInit = function (res) {
        if (res === void 0) { res = false; }
        this.form_data = {
            login: '',
            password: '',
            password_confirmation: '',
            email: '',
        };
        this.result = res;
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.result = this.user_service.register_user(this.form_data).subscribe(function (data) {
            console.log(data);
            _this.ngOnInit(data);
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