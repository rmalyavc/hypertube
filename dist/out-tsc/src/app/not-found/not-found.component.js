import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
        this.img = require('./assets/404.png');
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent = tslib_1.__decorate([
        Component({
            selector: 'app-not-found',
            templateUrl: './not-found.component.html',
            styleUrls: ['./not-found.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());
export { NotFoundComponent };
//# sourceMappingURL=not-found.component.js.map