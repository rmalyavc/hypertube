import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var FilmDetailsComponent = /** @class */ (function () {
    function FilmDetailsComponent() {
    }
    FilmDetailsComponent.prototype.ngOnInit = function () {
        console.log(this.film_data);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], FilmDetailsComponent.prototype, "film_data", void 0);
    FilmDetailsComponent = tslib_1.__decorate([
        Component({
            selector: '.app-film-details',
            templateUrl: './film-details.component.html',
            styleUrls: ['./film-details.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FilmDetailsComponent);
    return FilmDetailsComponent;
}());
export { FilmDetailsComponent };
//# sourceMappingURL=film-details.component.js.map