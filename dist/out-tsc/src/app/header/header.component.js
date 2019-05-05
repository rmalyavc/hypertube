import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../user.service';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(user_service) {
        this.user_service = user_service;
        this.logo = require('./assets/logo.png');
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.current_user = this.user_service.get_current_user();
        this.buttons = this.current_user ? ['logout', 'profile'] : ['login'];
    };
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map