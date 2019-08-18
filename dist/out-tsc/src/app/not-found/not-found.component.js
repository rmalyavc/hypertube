import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var NotFoundComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NotFoundComponent, _super);
    function NotFoundComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.img = require('./assets/404.png');
        return _this;
    }
    // constructor() { }
    NotFoundComponent.prototype.ngOnInit = function () {
        this.get_mod_strings('application');
    };
    NotFoundComponent = tslib_1.__decorate([
        Component({
            selector: 'app-not-found',
            templateUrl: './not-found.component.html',
            styleUrls: ['./not-found.component.css']
        })
    ], NotFoundComponent);
    return NotFoundComponent;
}(BaseComponent));
export { NotFoundComponent };
//# sourceMappingURL=not-found.component.js.map