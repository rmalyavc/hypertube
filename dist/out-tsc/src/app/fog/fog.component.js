import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var FogComponent = /** @class */ (function () {
    function FogComponent() {
        this.answer = new EventEmitter();
    }
    FogComponent.prototype.ngOnInit = function () {
    };
    FogComponent.prototype.return_answer = function (res) {
        this.answer.emit(res);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], FogComponent.prototype, "question", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], FogComponent.prototype, "answer", void 0);
    FogComponent = tslib_1.__decorate([
        Component({
            selector: '.app-fog',
            templateUrl: './fog.component.html',
            styleUrls: ['./fog.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FogComponent);
    return FogComponent;
}());
export { FogComponent };
//# sourceMappingURL=fog.component.js.map