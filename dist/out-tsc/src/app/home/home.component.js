import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Subject } from 'rxjs';
var HomeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HomeComponent, _super);
    function HomeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.load_more = new Subject();
        return _this;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.get_mod_strings('application');
    };
    HomeComponent.prototype.handle_scroll = function (event) {
        var tracker = event.target;
        var limit = tracker.scrollHeight - tracker.clientHeight;
        if (event.target.scrollTop >= limit - 1) {
            this.load_more.next(true);
        }
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