import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
var HistoryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HistoryComponent, _super);
    function HistoryComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.limit = 20;
        _this.skip = 0;
        _this.filters = {
            sort_order: 'DESC',
            order_by: 'updated_at'
        };
        _this.sort_order = 'DESC';
        _this.order_by = 'updated_at';
        return _this;
    }
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.history = [];
        this.skip = 0;
        if (!this.current_user)
            this.router.navigate(['']);
        else {
            this.check_login();
            this.route.params.subscribe(function (params) {
                _this.user_id = params['id'];
                _this.user_service.get_user_profile(_this.user_id, _this.current_user).subscribe(function (res) {
                    _this.page_user = res.data || false;
                    if (_this.page_user)
                        _this.page_user.id = _this.page_user.uid;
                    _this.get_brawsing_history(_this.limit, _this.skip, _this.filters.order_by, _this.filters.sort_order);
                });
                console.log(_this);
            });
        }
    };
    HistoryComponent.prototype.handle_scroll = function (event) {
        var tracker = event.target;
        var limit = tracker.scrollHeight - tracker.clientHeight;
        if (event.target.scrollTop >= limit - 1) {
            this.skip += 20;
            this.get_brawsing_history(this.limit, this.skip, this.filters.order_by, this.filters.sort_order);
        }
    };
    HistoryComponent = tslib_1.__decorate([
        Component({
            selector: '.app-history',
            templateUrl: './history.component.html',
            styleUrls: ['../profile/profile.component.css', './history.component.css']
        })
    ], HistoryComponent);
    return HistoryComponent;
}(ProfileComponent));
export { HistoryComponent };
//# sourceMappingURL=history.component.js.map