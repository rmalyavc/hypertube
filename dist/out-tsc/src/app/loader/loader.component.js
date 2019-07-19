import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var LoaderComponent = /** @class */ (function () {
    function LoaderComponent() {
        this.loader = require('./assets/loader.gif');
    }
    LoaderComponent.prototype.ngOnInit = function () {
    };
    LoaderComponent = tslib_1.__decorate([
        Component({
            selector: '.app-loader',
            templateUrl: './loader.component.html',
            styleUrls: ['./loader.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], LoaderComponent);
    return LoaderComponent;
}());
export { LoaderComponent };
//# sourceMappingURL=loader.component.js.map