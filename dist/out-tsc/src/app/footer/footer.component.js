import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var FooterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FooterComponent, _super);
    function FooterComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wolf = require('./assets/wolf.png');
        return _this;
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.get_mod_strings('application');
    };
    FooterComponent = tslib_1.__decorate([
        Component({
            selector: '.app-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.css']
        })
    ], FooterComponent);
    return FooterComponent;
}(BaseComponent));
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map