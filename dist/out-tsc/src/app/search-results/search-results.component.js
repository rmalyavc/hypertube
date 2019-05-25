import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
var SearchResultsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SearchResultsComponent, _super);
    function SearchResultsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.search_data = {};
        return _this;
    }
    SearchResultsComponent.prototype.ngOnInit = function (first_load) {
        var _this = this;
        if (first_load === void 0) { first_load = true; }
        if (first_load)
            var parent_data = this.route.queryParams.subscribe(function (params) {
                _this.search_data.advanced = params.advanced == "true" ? true : false;
                _this.search_data.filters = JSON.parse(params.filters);
                _this.search_data.filter_groups = JSON.parse(params.filter_groups);
                _this.search_data.groups = JSON.parse(params.groups);
                _this.search_data.groups_visible = JSON.parse(params.groups_visible);
                _this.search_data.search_string = params.search_string;
                _this.search_data.keys = Object.keys(_this.groups);
                console.log(_this.search_data.groups_visible);
                _this.get_results();
            });
    };
    SearchResultsComponent.prototype.get_results = function () {
        var groups = Object.keys(this.filter_groups);
        for (var i = 0; i < groups.length; i++) {
            if (!this.filter_groups[groups[i]])
                delete this.filters[groups[i]];
        }
        // console.log(this.filter_groups);
        // console.log(this.filters);
        // console.log(this.search_string);
        // this._url = 
    };
    SearchResultsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-search-results',
            templateUrl: './search-results.component.html',
            styleUrls: ['./search-results.component.css']
        })
    ], SearchResultsComponent);
    return SearchResultsComponent;
}(SearchComponent));
export { SearchResultsComponent };
//# sourceMappingURL=search-results.component.js.map