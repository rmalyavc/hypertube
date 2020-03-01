import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var FilmService = /** @class */ (function () {
    function FilmService(http) {
        var _this = this;
        this.http = http;
        this._url = '';
        this.movie_db_url = 'https://api.themoviedb.org/3/';
        this.api_key = '412d472aa9ed6eec7376bf00249e3b0a';
        this.config = {};
        this.access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTJkNDcyYWE5ZWQ2ZWVjNzM3NmJmMDAyNDllM2IwYSIsInN1YiI6IjVkMzllYWU3NjBjNTFkMjAxNTgyMTlkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bi-ooSJ99qDJn7kKsTabhwsfPsT4lgAhZfJCBmI5LNw';
        this.genre_list = {};
        this.lang = 'EN';
        this._url = this.movie_db_url + 'configuration?api_key=' + this.api_key;
        this.http.get(this._url).subscribe(function (res) {
            _this.config = res;
        });
        var lang = localStorage.getItem('page_lang');
        if (lang)
            this.lang = lang;
        this._url = this.movie_db_url + 'genre/movie/list?api_key=' + this.api_key + '&language=' + this.lang;
        this.http.get(this._url).subscribe(function (res) {
            if (res['genres'] && res['genres'].length > 0) {
                for (var i = 0; i < res['genres'].length; i++) {
                    var genre = res['genres'][i];
                    _this.genre_list[genre.id] = genre.name;
                }
            }
        });
    }
    FilmService.prototype.get_base_url = function () {
        return 'https://70fc0be4.ngrok.io/';
    };
    FilmService.prototype.get_film = function (film_id) {
        // this._url = 'https://yts.lt/api/v2/movie_details.json?movie_id=' + film_id;
        this._url = this.movie_db_url + 'movie/' + film_id + '?api_key=' + this.api_key + '&language=' + this.lang;
        return this.http.get(this._url);
    };
    // get_comments(current_user, movie_id: string, limit: number = 10, skip: number = 0) {
    // 	this._url = this.get_base_url() + '/movie/get/comments';
    //      this._url += '?token=' + current_user.token + '&record_id=' + movie_id + '&limit=' + limit + '&skip=' + skip;
    // 	return this.http.get<IResult>(this._url);
    // }
    FilmService.prototype.save_visit = function (movie, current_user) {
        this._url = this.get_base_url() + 'user/history/addMovie';
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
        return this.http.get(this._url);
    };
    // post_comment(current_user, movie_id, value) {
    //     this._url = this.get_base_url() + '/movie/set/comment';
    //     var params = {
    //         uid: current_user.uid,
    //         token: current_user.token,
    //         record_id: movie_id,
    //         comment: value,
    //     };
    //     return this.http.post<IResult>(this._url, params);
    // }
    // update_comment(current_user, current_comment) {
    //     this._url = this.get_base_url() + '/movie/edit/comment';
    //     var params = {
    //         uid: current_user.uid,
    //         token: current_user.token,
    //         id: current_comment.id,
    //         comment: current_comment.comment
    //     };
    //     return this.http.post<IResult>(this._url, params);
    // }
    // delete_comment(current_user, current_comment) {
    //     this._url = this.get_base_url() + '/movie/delete/comment';
    //     var params = {
    //         uid: current_user.uid,
    //         token: current_user.token,
    //         id: current_comment.id
    //     };
    //     return this.http.post<IResult>(this._url, params);
    // }
    FilmService.prototype.search_movies = function (search_data, page) {
        if (search_data === void 0) { search_data = false; }
        if (page === void 0) { page = 1; }
        this._url = this.movie_db_url;
        var query_part = '?api_key=' + this.api_key;
        var method = 'discover';
        if (search_data) {
            query_part += '&query=' + search_data.search_string;
            if (search_data.search_string != '')
                method = 'search';
            for (var i = 0; i < search_data.keys.length; i++) {
                var key = search_data.keys[i];
                if (key == 'sort_by' && search_data.filters.sort_by &&
                    search_data.filters.sort_by != '' && search_data.filters.order_by &&
                    search_data.filters.order_by != '') {
                    search_data.filters.sort_by = search_data.filters.sort_by.replace('.asc', '').replace('.desc', '') + '.' + search_data.filters.order_by;
                }
                else if (key != 'order_by' && search_data.filters[key] && search_data.filters[key] != '') {
                    query_part += '&' + key + '=';
                    if (key != 'with_genres') {
                        query_part += search_data.filters[key];
                    }
                    else {
                        var genres = [];
                        for (var j = 0; search_data.filters[key][j]; j++) {
                            genres.push(search_data.filters[key][j].item_id);
                        }
                        query_part += genres.join();
                    }
                }
            }
        }
        query_part += '&page=' + page + '&language=' + this.lang.toLowerCase();
        // query_part += '&language=' + this.lang;
        this._url += method + '/movie' + query_part;
        console.log(this._url);
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