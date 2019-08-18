import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';
var BaseComponent = /** @class */ (function () {
    function BaseComponent(user_service, router, route, lang_service) {
        this.user_service = user_service;
        this.router = router;
        this.route = route;
        this.lang_service = lang_service;
        this.component_name = 'BaseComponent';
        this.project_name = 'Hypertube';
        this.creators = ['rmalyavc,', 'dkliukin'];
        this.app_strings = {};
        this.mod_strings = {};
        this.show_fog = false;
        this.show_loader = false;
        this.confirm_question = '';
        this.errors = [];
        this.page_lang = 'EN';
        this.current_user = JSON.parse(localStorage.getItem('current_user') || 'false');
        var lang = localStorage.getItem('page_lang');
        if (!this.current_user) {
            if (!lang)
                localStorage.setItem('page_lang', this.page_lang);
            else
                this.page_lang = lang;
        }
        else {
            this.page_lang = this.current_user.lang;
            localStorage.setItem('page_lang', this.page_lang);
        }
        this.component_name = this.constructor.name;
    }
    BaseComponent.prototype.ngOnInit = function () {
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
        if (!this.current_user)
            this.redirect_to_home(true);
        else {
            this.user_service.is_logged_in(this.current_user).subscribe(function (data) {
                if (!data.status)
                    _this.logout();
            });
        }
    };
    BaseComponent.prototype.logout = function () {
        var _this = this;
        this.user_service.logout_user(this.current_user).subscribe(function (data) {
            localStorage.removeItem('current_user');
            _this.current_user = false;
            window.location.href = '/login';
        }, function (error) {
            localStorage.removeItem('current_user');
            _this.current_user = false;
            window.location.href = '/login';
            console.clear();
        });
    };
    BaseComponent.prototype.get_mod_strings = function (component, lang, callback) {
        var _this = this;
        if (component === void 0) { component = this.component_name; }
        if (lang === void 0) { lang = this.page_lang; }
        if (callback === void 0) { callback = function () { return; }; }
        this.lang_service.get_labels(lang, component).subscribe(function (data) {
            if (component != 'application')
                Object.assign(_this.mod_strings, data);
            else
                Object.assign(_this.app_strings, data);
            callback();
        }, function (error) {
            _this.mod_strings = {};
            callback();
        });
    };
    BaseComponent.prototype.change_lang = function () {
        var _this = this;
        localStorage.setItem('page_lang', this.page_lang);
        if (this.current_user) {
            this.check_login();
            this.current_user.lang = this.page_lang;
            var form_data = Object.assign({}, this.current_user);
            delete form_data.login;
            this.user_service.update_user(form_data).subscribe(function (res) {
                if (res.status) {
                    res.data.token = _this.current_user.token;
                    res.data.id = res.data.uid;
                    localStorage.setItem('current_user', JSON.stringify(res.data));
                    _this.current_user = res.data;
                    _this.ngOnInit();
                    window.location.reload();
                }
            });
        }
        else
            window.location.reload();
    };
    BaseComponent.prototype.handle_request_error = function (need_alert, message) {
        if (need_alert === void 0) { need_alert = false; }
        if (message === void 0) { message = this.app_strings.LBL_ERR_500; }
        // console.clear();
        this.success = false;
        if (need_alert)
            alert(message);
        else
            this.errors.push(message);
        this.show_loader = false;
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