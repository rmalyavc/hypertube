import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.get_current_user = function (logged_out) {
        if (logged_out === void 0) { logged_out = false; }
        this._url = '/assets/data/user.json';
        return this.http.get(this._url);
    };
    UserService.prototype.register_user = function (form_data) {
        this._url = 'http://26f97791.ngrok.io/register';
        return this.http.post(this._url, form_data);
    };
    UserService.prototype.login_user = function (user_data) {
        this._url = 'http://84087a29.ngrok.io/test';
        return this.http.post(this._url, user_data);
    };
    UserService.prototype.get_csrf = function () {
        this._url = 'http://84087a29.ngrok.io/app/token';
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