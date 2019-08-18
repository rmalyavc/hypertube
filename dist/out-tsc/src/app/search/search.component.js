import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { FilmService } from '../film.service';
import { Router, ActivatedRoute } from '@angular/router';
var SearchComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SearchComponent, _super);
    function SearchComponent(http, user_service, router, route, lang_service, film_service) {
        var _this = _super.call(this, user_service, router, route, lang_service) || this;
        _this.http = http;
        _this.user_service = user_service;
        _this.router = router;
        _this.route = route;
        _this.lang_service = lang_service;
        _this.film_service = film_service;
        _this.refresh_search = new EventEmitter();
        _this.parent_data = false;
        _this.advanced = false;
        _this.filters = {};
        _this.groups = {};
        _this.genre_list = [];
        return _this;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.get_mod_strings('application', this.page_lang, function () {
            _this.get_mod_strings(_this.component_name, _this.page_lang, function () {
                _this.dropdown_settings = {
                    singleSelection: false,
                    idField: 'item_id',
                    textField: 'item_text',
                    selectAllText: _this.app_strings.LBL_SELECT_ALL,
                    unSelectAllText: _this.app_strings.LBL_DESELECT_ALL,
                    searchPlaceholderText: _this.app_strings.LBL_SEARCH,
                    itemsShowLimit: 4,
                    allowSearchFilter: true
                };
                _this.groups = _this.get_filters().subscribe(function (data) {
                    var obj = _this;
                    var count = 0;
                    var interval_id = setInterval(function () {
                        if ((Object.keys(obj.film_service.genre_list).length > 0 || count++ > 50) && obj.collect_genres()) {
                            obj.keys = Object.keys(obj.groups);
                            for (var i = 0; i < obj.keys.length; i++) {
                                var key = obj.keys[i];
                                if (obj.groups[key].length > 0)
                                    obj.filters[key] = obj.groups[key][0];
                            }
                            clearInterval(interval_id);
                        }
                    }, 100);
                    _this.groups = data;
                });
                if (_this.parent_data != false && _this.parent_data != {}) {
                    _this.keys = _this.parent_data.keys ? _this.parent_data.keys : _this.keys;
                    _this.advanced = _this.parent_data.advanced ? _this.parent_data.advanced : _this.advanced;
                    _this.filters = _this.parent_data.filters ? _this.parent_data.filters : _this.filters;
                    _this.groups = _this.parent_data.groups ? _this.parent_data.groups : _this.groups;
                    _this.search_string = _this.parent_data.search_string ? _this.parent_data.search_string : _this.search_string;
                }
            });
        });
    };
    SearchComponent.prototype.get_filters = function () {
        this._url = '/assets/data/filters.json';
        return this.http.get(this._url);
    };
    SearchComponent.prototype.show_advanced = function () {
        this.advanced = !this.advanced;
    };
    SearchComponent.prototype.do_search = function () {
        var navigationExtras = {
            queryParams: {
                filters: JSON.stringify(this.filters),
                search_string: this.search_string,
                groups: JSON.stringify(this.groups),
                advanced: this.advanced,
            }
        };
        this.router.navigate(['/'], navigationExtras);
        var that = this;
        setTimeout(function () {
            that.refresh_search.emit(true);
        }, 300);
    };
    SearchComponent.prototype.collect_genres = function () {
        // console.log(this.groups);
        // return ;
        var genre_keys = Object.keys(this.film_service.genre_list);
        for (var i = 0; i < genre_keys.length; i++) {
            var key = genre_keys[i];
            this.groups['with_genres'].push(key);
            this.mod_strings.lists.with_genres[key] = this.film_service.genre_list[key];
            this.genre_list.push({ item_id: key, item_text: this.film_service.genre_list[key] });
        }
        return true;
    };
    SearchComponent.prototype.onItemSelect = function (item) {
        // console.log(item);
    };
    SearchComponent.prototype.onSelectAll = function (items) {
        // console.log(items);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], SearchComponent.prototype, "refresh_search", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SearchComponent.prototype, "parent_data", void 0);
    SearchComponent = tslib_1.__decorate([
        Component({
            selector: '.app-search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, UserService, Router, ActivatedRoute, LangService, FilmService])
    ], SearchComponent);
    return SearchComponent;
}(BaseComponent));
export { SearchComponent };
//# sourceMappingURL=search.component.js.map