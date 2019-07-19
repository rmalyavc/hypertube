import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';
var SearchComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SearchComponent, _super);
    function SearchComponent(http, user_service, router, route, lang_service) {
        var _this = _super.call(this, user_service, router, route, lang_service) || this;
        _this.http = http;
        _this.user_service = user_service;
        _this.router = router;
        _this.route = route;
        _this.lang_service = lang_service;
        _this.refresh_search = new EventEmitter();
        _this.parent_data = false;
        _this.advanced = false;
        _this.filters = {};
        _this.groups = {};
        _this.groups_visible = {};
        return _this;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groups = this.get_filters().subscribe(function (data) {
            _this.groups = data;
            _this.keys = Object.keys(_this.groups);
            for (var i = 0; i < _this.keys.length; i++) {
                var group = _this.keys[i];
                _this.groups_visible[group] = true;
                var cats = _this.groups[group];
                _this.filters[group] = {};
                for (var j = 0; j < cats.length; j++) {
                    _this.filters[group][cats[j]] = true;
                }
            }
        });
        console.log(this.parent_data);
        if (this.parent_data != false && this.parent_data != {}) {
            this.keys = this.parent_data.keys ? this.parent_data.keys : this.keys;
            this.advanced = this.parent_data.advanced ? this.parent_data.advanced : this.advanced;
            this.filters = this.parent_data.filters ? this.parent_data.filters : this.filters;
            this.groups = this.parent_data.groups ? this.parent_data.groups : this.groups;
            this.groups_visible = this.parent_data.groups_visible ? this.parent_data.groups_visible : this.groups_visible;
            this.search_string = this.parent_data.search_string ? this.parent_data.search_string : this.search_string;
        }
        // else {
        // 	this.groups = this.get_filters().subscribe(data => {
        // 		this.groups = data;
        // 		this.keys = Object.keys(this.groups);
        // 		for (var i = 0; i < this.keys.length; i++) {
        // 			var group = this.keys[i];
        // 			this.groups_visible[group] = true;
        // 			var cats = this.groups[group];
        // 			this.filters[group] = {};
        // 			for (var j = 0; j < cats.length; j++) {
        // 				this.filters[group][cats[j]] = true;
        // 			}
        // 		}
        // 	});
        // }
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
                groups_visible: JSON.stringify(this.groups_visible),
                advanced: this.advanced,
            }
        };
        this.router.navigate(['/'], navigationExtras);
        var that = this;
        setTimeout(function () {
            that.refresh_search.emit(true);
        }, 300);
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
        tslib_1.__metadata("design:paramtypes", [HttpClient, UserService, Router, ActivatedRoute, LangService])
    ], SearchComponent);
    return SearchComponent;
}(BaseComponent));
export { SearchComponent };
//# sourceMappingURL=search.component.js.map