import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var HeaderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HeaderComponent, _super);
    function HeaderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logo = require('./assets/logo.png');
        return _this;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.buttons = this.current_user ? ['logout', 'profile'] : ['login'];
    };
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}(BaseComponent));
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map