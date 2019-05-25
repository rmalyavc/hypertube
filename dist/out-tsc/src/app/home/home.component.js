import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var HomeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HomeComponent, _super);
    function HomeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}(BaseComponent));
export { HomeComponent };
//# sourceMappingURL=home.component.js.map