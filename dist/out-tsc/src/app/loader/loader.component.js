import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var LoaderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LoaderComponent, _super);
    function LoaderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loader = require('./assets/loader.gif');
        return _this;
    }
    LoaderComponent.prototype.ngOnInit = function () {
        this.get_mod_strings('application');
    };
    LoaderComponent = tslib_1.__decorate([
        Component({
            selector: '.app-loader',
            templateUrl: './loader.component.html',
            styleUrls: ['./loader.component.css']
        })
    ], LoaderComponent);
    return LoaderComponent;
}(BaseComponent));
export { LoaderComponent };
//# sourceMappingURL=loader.component.js.map