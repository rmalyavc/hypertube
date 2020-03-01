import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var LangService = /** @class */ (function () {
    function LangService(http) {
        this.http = http;
    }
    LangService.prototype.get_labels = function (lang, component) {
        if (lang === void 0) { lang = 'EN'; }
        if (component === void 0) { component = 'application'; }
        var file = component + '/' + lang + '.json';
        this._url = '/assets/data/language/' + file;
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