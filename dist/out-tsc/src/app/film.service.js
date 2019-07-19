import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var FilmService = /** @class */ (function () {
    function FilmService(http) {
        this.http = http;
        this._url = '';
    }
    FilmService.prototype.get_base_url = function () {
        return 'https://e973ac68.ngrok.io/';
    };
    FilmService.prototype.get_film = function (film_id) {
        this._url = 'https://yts.lt/api/v2/movie_details.json?movie_id=' + film_id;
        return this.http.get(this._url);
    };
    FilmService.prototype.get_comments = function (current_user, movie_id, limit, skip) {
        if (limit === void 0) { limit = 10; }
        if (skip === void 0) { skip = 0; }
        this._url = this.get_base_url() + '/movie/get/comments';
        this._url += '?token=' + current_user.token + '&record_id=' + movie_id + '&limit=' + limit + '&skip=' + skip;
        console.log(this._url);
        return this.http.get(this._url);
    };
    FilmService.prototype.save_visit = function (movie, current_user) {
        this._url = this.get_base_url() + '/user/history/addMovie';
        var query_part = {
            movie_id: movie.id,
            name: movie.name,
            img: movie.img,
            uid: current_user.uid,
            token: current_user.token
        };
        return this.http.post(this._url, query_part);
    };
    FilmService.prototype.get_history = function (page_user, current_user, limit, skip, order_by, sort_order) {
        if (limit === void 0) { limit = 20; }
        if (skip === void 0) { skip = 0; }
        if (order_by === void 0) { order_by = 'updated_at'; }
        if (sort_order === void 0) { sort_order = 'DESC'; }
        this._url = this.get_base_url() + '/user/history/movies?limit=' + limit + '&uid=' + page_user.uid + '&token=' + current_user.token + '&skip=' + skip + '&order_by=' + order_by + '&sort_order=' + sort_order;
        console.log(this._url);
        return this.http.get(this._url);
    };
    FilmService.prototype.post_comment = function (current_user, movie_id, value) {
        this._url = this.get_base_url() + '/movie/set/comment';
        var params = {
            uid: current_user.uid,
            token: current_user.token,
            record_id: movie_id,
            comment: value,
        };
        return this.http.post(this._url, params);
    };
    FilmService.prototype.update_comment = function (current_user, current_comment) {
        this._url = this.get_base_url() + '/movie/edit/comment';
        var params = {
            uid: current_user.uid,
            token: current_user.token,
            id: current_comment.id,
            comment: current_comment.comment
        };
        return this.http.post(this._url, params);
    };
    FilmService.prototype.delete_comment = function (current_user, current_comment) {
        this._url = this.get_base_url() + '/movie/delete/comment';
        var params = {
            uid: current_user.uid,
            token: current_user.token,
            id: current_comment.id
        };
        return this.http.post(this._url, params);
    };
    FilmService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], FilmService);
    return FilmService;
}());
export { FilmService };
//# sourceMappingURL=film.service.js.map