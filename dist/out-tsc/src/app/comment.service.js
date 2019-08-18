import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var CommentService = /** @class */ (function () {
    function CommentService(http) {
        this.http = http;
        this._url = '';
    }
    CommentService.prototype.get_base_url = function () {
        return 'https://70fc0be4.ngrok.io/';
        // return '/assets/data/user_suggests/users.json';
    };
    CommentService.prototype.get_suggests = function () {
        // this._url = this.get_base_url();
        this._url = '/assets/data/user_suggests/users.json';
        return this.http.get(this._url);
    };
    CommentService.prototype.post_comment = function (current_user, movie_id, value) {
        this._url = this.get_base_url() + '/movie/set/comment';
        var params = {
            uid: current_user.uid,
            token: current_user.token,
            record_id: movie_id,
            comment: value,
        };
        return this.http.post(this._url, params);
    };
    CommentService.prototype.update_comment = function (current_user, current_comment) {
        this._url = this.get_base_url() + '/movie/edit/comment';
        var params = {
            uid: current_user.uid,
            token: current_user.token,
            id: current_comment.id,
            comment: current_comment.comment
        };
        return this.http.post(this._url, params);
    };
    CommentService.prototype.delete_comment = function (current_user, current_comment) {
        this._url = this.get_base_url() + '/movie/delete/comment';
        var params = {
            uid: current_user.uid,
            token: current_user.token,
            id: current_comment.id
        };
        return this.http.post(this._url, params);
    };
    CommentService.prototype.get_comments = function (current_user, movie_id, limit, skip) {
        if (limit === void 0) { limit = 10; }
        if (skip === void 0) { skip = 0; }
        this._url = this.get_base_url() + '/movie/get/comments';
        this._url += '?token=' + current_user.token + '&record_id=' + movie_id + '&limit=' + limit + '&skip=' + skip;
        return this.http.get(this._url);
    };
    CommentService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CommentService);
    return CommentService;
}());
export { CommentService };
//# sourceMappingURL=comment.service.js.map