import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var FogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FogComponent, _super);
    function FogComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.answer = new EventEmitter();
        return _this;
    }
    // constructor() { }
    FogComponent.prototype.ngOnInit = function () {
        this.get_mod_strings('application');
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
        })
    ], FogComponent);
    return FogComponent;
}(BaseComponent));
export { FogComponent };
//# sourceMappingURL=fog.component.js.map