import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';
var BaseComponent = /** @class */ (function () {
    function BaseComponent(user_service, router, route, lang_service) {
        var _this = this;
        this.user_service = user_service;
        this.router = router;
        this.route = route;
        this.lang_service = lang_service;
        this.project_name = 'Hypertube';
        this.creators = ['rmalyavc,', 'dkliukin'];
        this.show_fog = false;
        this.show_loader = false;
        this.confirm_question = '';
        this.current_user = JSON.parse(localStorage.getItem('current_user') || 'false');
        this.app_strings = this.lang_service.get_labels(this.current_user.lang).subscribe(function (data) {
            _this.app_strings = data;
        });
    }
    BaseComponent.prototype.ngOnInit = function () {
        // console.log(this.current_user);
    };
    BaseComponent.prototype.redirect_to_login = function () {
        this.router.navigate(['login']);
    };
    BaseComponent.prototype.redirect_to_home = function (reload) {
        if (reload === void 0) { reload = false; }
        this.router.navigate(['']);
        if (reload)
            window.location.href = '/';
    };
    BaseComponent.prototype.check_login = function () {
        var _this = this;
        console.log(this.current_user);
        if (!this.current_user)
            this.redirect_to_home(true);
        else {
            this.user_service.is_logged_in(this.current_user).subscribe(function (data) {
                console.log(data);
                if (!data.status)
                    _this.logout();
            });
        }
    };
    BaseComponent.prototype.logout = function () {
        var _this = this;
        this.user_service.logout_user(this.current_user).subscribe(function (data) {
            // console.log(data);
            localStorage.removeItem('current_user');
            _this.current_user = false;
            window.location.href = '/login';
        });
        // localStorage.removeItem('current_user');
        // this.current_user = false;
        // window.location.href = '/login';
    };
    BaseComponent = tslib_1.__decorate([
        Component({
            selector: 'app-base',
            template: "",
            styleUrls: ['./base.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router, ActivatedRoute, LangService])
    ], BaseComponent);
    return BaseComponent;
}());
export { BaseComponent };
//# sourceMappingURL=base.component.js.map