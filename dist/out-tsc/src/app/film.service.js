import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var FilmService = /** @class */ (function () {
    function FilmService(http) {
        this.http = http;
        this._url = '';
    }
    FilmService.prototype.get_film = function (film_id) {
        this._url = 'https://yts.lt/api/v2/movie_details.json?movie_id=' + film_id;
        return this.http.get(this._url);
    };
    FilmService.prototype.get_comments = function (film_id) {
        this._url = 'https://yts.lt/api/v2/movie_comments.json?movie_id=' + film_id;
        return this.http.get(this._url);
    };
    FilmService.prototype.save_visit = function (movie, current_user) {
        this._url = 'https://5c6bf299.ngrok.io/user/history/addMovie';
        var query_part = {
            movie_id: movie.id,
            name: movie.name,
            img: movie.img,
            uid: current_user.id,
            token: 'test_token'
        };
        return this.http.post(this._url, query_part);
    };
    FilmService.prototype.get_history = function (user_id, limit) {
        if (limit === void 0) { limit = 20; }
        this._url = 'https://5c6bf299.ngrok.io/user/history/movies/' + limit + '?uid=' + user_id;
        return this.http.get(this._url);
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