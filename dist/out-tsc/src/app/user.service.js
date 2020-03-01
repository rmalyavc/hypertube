import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.get_base_url = function () {
        return 'https://70fc0be4.ngrok.io/';
    };
    UserService.prototype.get_current_user = function (logged_out) {
        if (logged_out === void 0) { logged_out = false; }
        this._url = '/assets/data/user.json';
        return this.http.get(this._url);
    };
    UserService.prototype.register_user = function (form_data) {
        this._url = this.get_base_url() + 'register';
        return this.http.post(this._url, form_data);
    };
    UserService.prototype.complete_registration = function (token) {
        this._url = this.get_base_url() + 'user/verify/' + token;
        return this.http.get(this._url);
    };
    UserService.prototype.login_user = function (user_data) {
        this._url = this.get_base_url() + 'login';
        return this.http.post(this._url, user_data);
    };
    UserService.prototype.logout_user = function (current_user) {
        this._url = this.get_base_url() + 'logout?token=' + current_user.token;
        return this.http.get(this._url);
    };
    UserService.prototype.get_user_profile = function (user_id, current_user) {
        this._url = this.get_base_url() + 'user/profile' + '?uid=' + user_id + '&token=' + current_user.token;
        return this.http.get(this._url);
    };
    UserService.prototype.is_logged_in = function (current_user) {
        this._url = this.get_base_url() + 'getUserStatus?' + 'uid=' + current_user.id + '&token=' + current_user.token;
        return this.http.get(this._url);
    };
    UserService.prototype.update_user = function (form_data) {
        this._url = this.get_base_url() + 'user/update';
        return this.http.post(this._url, form_data);
    };
    UserService.prototype.change_password = function (form_data) {
        this._url = this.get_base_url() + 'user/password/' + form_data.action;
        return this.http.post(this._url, form_data);
    };
    UserService.prototype.get_notifications = function (current_user) {
        this._url = '/assets/data/notifications.json';
        return this.http.get(this._url);
    };
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map