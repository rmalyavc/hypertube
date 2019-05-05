import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(user_service, router) {
        this.user_service = user_service;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.current_user = this.user_service.get_current_user(true);
        if (!this.current_user)
            this.router.navigate(['']);
    };
    var _a;
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof UserService !== "undefined" && UserService) === "function" ? _a : Object, Router])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map