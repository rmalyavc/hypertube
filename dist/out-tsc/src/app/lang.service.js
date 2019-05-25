import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var LangService = /** @class */ (function () {
    function LangService(http) {
        this.http = http;
    }
    LangService.prototype.get_labels = function (lang) {
        if (lang === void 0) { lang = 'EN'; }
        this._url = '/assets/data/' + lang + '.json';
        return this.http.get(this._url);
    };
    LangService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], LangService);
    return LangService;
}());
export { LangService };
//# sourceMappingURL=lang.service.js.map