import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var FilmDetailsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FilmDetailsComponent, _super);
    function FilmDetailsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // constructor() { }
    FilmDetailsComponent.prototype.ngOnInit = function () {
        this.get_mod_strings();
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
        })
    ], FilmDetailsComponent);
    return FilmDetailsComponent;
}(BaseComponent));
export { FilmDetailsComponent };
//# sourceMappingURL=film-details.component.js.map