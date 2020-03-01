import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SearchService } from '../search.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { FilmService } from '../film.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
var SearchResultsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SearchResultsComponent, _super);
    function SearchResultsComponent(http, user_service, router, route, lang_service, search_service, film_service) {
        var _this = _super.call(this, user_service, router, route, lang_service) || this;
        _this.http = http;
        _this.user_service = user_service;
        _this.router = router;
        _this.route = route;
        _this.lang_service = lang_service;
        _this.search_service = search_service;
        _this.film_service = film_service;
        _this.search_data = {};
        _this.filts = {};
        _this.results = false;
        _this._url = '';
        _this.page = 1;
        _this.limit = 20;
        _this.no_img = require('./assets/no_image.png');
        _this.end_of_results = false;
        return _this;
    }
    SearchResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.film_service.lang = this.page_lang;
        this.get_mod_strings('application', this.page_lang, function () {
            _this.get_mod_strings('SearchComponent', _this.page_lang, function () {
                _this.end_of_results = false;
                _this.load_more.subscribe(function (v) {
                    if (!_this.end_of_results) {
                        _this.film_service.search_movies(_this.search_data, _this.page).subscribe(function (results) {
                            if (results.results) {
                                for (var i = 0; i < results.results.length; i++) {
                                    if (results.results[i].poster_path)
                                        results.results[i].img = _this.film_service.config.images.base_url + 'original' + results.results[i].poster_path;
                                    else
                                        results.results[i].img = _this.no_img;
                                    if (_this.results)
                                        _this.results.push(results.results[i]);
                                }
                                if (results.results.length > 0)
                                    _this.page++;
                                else
                                    _this.end_of_results = true;
                            }
                        }, function (error) {
                            _this.handle_request_error();
                        });
                    }
                });
                _this.route.queryParams.subscribe(function (params) {
                    if (params != {}) {
                        _this.search_data.advanced = params.advanced == "true" ? true : false;
                        _this.search_data.filters = params.filters ? JSON.parse(params.filters) : {};
                        _this.search_data.groups = params.groups ? JSON.parse(params.groups) : {};
                        _this.search_data.search_string = params.search_string ? params.search_string : '';
                        _this.search_data.keys = Object.keys(_this.search_data.groups);
                    }
                    _this.show_loader = true;
                    _this.page = 1;
                    _this.film_service.search_movies(_this.search_data, _this.page).subscribe(function (results) {
                        _this.results = results.results;
                        for (var i = 0; i < _this.results.length; i++) {
                            if (_this.results[i].poster_path)
                                _this.results[i].img = _this.film_service.config.images.base_url + 'original' + _this.results[i].poster_path;
                            else
                                _this.results[i].img = _this.no_img;
                        }
                        if (_this.results.length > 0)
                            _this.page++;
                        else
                            _this.end_of_results = true;
                        _this.show_loader = false;
                    }, function (error) {
                        _this.handle_request_error();
                    });
                });
            });
        });
    };
    SearchResultsComponent.prototype.watch_movie = function (id) {
        this.router.navigate(['/watch/' + id]);
    };
    SearchResultsComponent.prototype.refresh_search = function () {
        this.show_loader;
        this.results = false;
        this.page = 1;
        this.ngOnInit();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Subject)
    ], SearchResultsComponent.prototype, "load_more", void 0);
    SearchResultsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-search-results',
            templateUrl: './search-results.component.html',
            styleUrls: ['./search-results.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, UserService, Router, ActivatedRoute, LangService, SearchService, FilmService])
    ], SearchResultsComponent);
    return SearchResultsComponent;
}(BaseComponent));
export { SearchResultsComponent };
// https://yts.lt/api/v2/list_movies.json?query_term=terminator&genre=All&quality=All&sort_by=date_added&order_by=desc&page=1
//# sourceMappingURL=search-results.component.js.map