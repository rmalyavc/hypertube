import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SearchService } from '../search.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
var SearchResultsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SearchResultsComponent, _super);
    function SearchResultsComponent(http, user_service, router, route, lang_service, search_service) {
        var _this = _super.call(this, user_service, router, route, lang_service) || this;
        _this.http = http;
        _this.user_service = user_service;
        _this.router = router;
        _this.route = route;
        _this.lang_service = lang_service;
        _this.search_service = search_service;
        _this.search_data = {};
        _this.filts = {};
        _this.results = false;
        _this._url = '';
        _this.page = 1;
        return _this;
    }
    SearchResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load_more.subscribe(function (v) {
            _this.get_results().subscribe(function (results) {
                if (results.data.movies) {
                    _this.results.data.movie_count += results.data.movies.length;
                    for (var i = 0; i < results.data.movies.length; i++) {
                        _this.results.data.movies.push(results.data.movies[i]);
                    }
                }
            });
        });
        this.route.queryParams.subscribe(function (params) {
            if (params != {}) {
                _this.search_data.advanced = params.advanced == "true" ? true : false;
                _this.search_data.filters = params.filters ? JSON.parse(params.filters) : {};
                _this.search_data.groups = params.groups ? JSON.parse(params.groups) : {};
                _this.search_data.groups_visible = params.groups_visible ? JSON.parse(params.groups_visible) : {};
                _this.search_data.search_string = params.search_string ? params.search_string : '';
                _this.search_data.keys = Object.keys(_this.search_data.groups);
            }
            _this.get_results().subscribe(function (results) {
                _this.results = results;
            });
        });
    };
    SearchResultsComponent.prototype.get_results = function () {
        var filters = this.get_final_filters();
        var query_part = '?query_term=' + this.search_data.search_string;
        if (filters.video) {
            query_part += '&genre[]=';
            var keys = Object.keys(filters.video);
            for (var i = 0; i < keys.length; i++) {
                if (filters.video[keys[i]] == true)
                    query_part += keys[i];
                if (i < keys.length - 1 && filters.video[keys[i + 1]] == true)
                    query_part += ',';
            }
        }
        query_part += '&page=' + this.page++;
        this._url = 'https://yts.lt/api/v2/list_movies.json' + query_part;
        return this.http.get(this._url);
    };
    SearchResultsComponent.prototype.get_final_filters = function () {
        var groups = Object.keys(this.search_data.groups_visible);
        var filters = Object.assign({}, this.search_data.filters);
        for (var i = 0; i < groups.length; i++) {
            if (!this.search_data.groups_visible[groups[i]])
                delete filters[groups[i]];
            else {
                var keys = Object.keys(filters[groups[i]]);
                for (var j = 0; j < keys.length; j++) {
                    if (!filters[groups[i]][keys[j]])
                        delete filters[groups[i]][keys[j]];
                }
                if (keys.length > 0 && Object.keys(filters[groups[i]]).length == 0)
                    delete filters[groups[i]];
            }
        }
        return filters;
    };
    SearchResultsComponent.prototype.watch_movie = function (id) {
        this.router.navigate(['/watch/' + id]);
    };
    SearchResultsComponent.prototype.refresh_search = function () {
        // console.log(this.search_data);
        this.results = false;
        this.page = 1;
        this.ngOnInit();
        // this.get_results().subscribe(results => {
        // 	this.results = results;
        // });
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
        tslib_1.__metadata("design:paramtypes", [HttpClient, UserService, Router, ActivatedRoute, LangService, SearchService])
    ], SearchResultsComponent);
    return SearchResultsComponent;
}(BaseComponent));
export { SearchResultsComponent };
//# sourceMappingURL=search-results.component.js.map