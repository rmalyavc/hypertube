import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var SearchService = /** @class */ (function () {
    function SearchService(http) {
        this.http = http;
        this._url = '';
    }
    SearchService.prototype.get_results = function (filters, sort_by, order_by) {
        if (filters === void 0) { filters = false; }
        if (sort_by === void 0) { sort_by = ''; }
        if (order_by === void 0) { order_by = 'desc'; }
        var query_part = '';
        if (filters.video) {
            query_part = '?genre[]=';
            var keys = Object.keys(filters.video);
            for (var i = 0; i < keys.length; i++) {
                if (filters.video[keys[i]] == true)
                    query_part += keys[i];
                if (i < keys.length - 1 && filters.video[keys[i + 1]] == true)
                    query_part += ',';
            }
        }
        if (sort_by != '') {
            query_part += query_part == '' ? '?' : '&';
            query_part += 'sort_by=' + sort_by + '&order_by=' + order_by;
        }
        this._url = 'https://yts.lt/api/v2/list_movies.json' + query_part;
        console.log(this._url);
        return this.http.get(this._url);
    };
    SearchService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], SearchService);
    return SearchService;
}());
export { SearchService };
//# sourceMappingURL=search.service.js.map