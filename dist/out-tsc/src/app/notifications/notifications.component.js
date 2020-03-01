import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { trigger, state, transition, style, animate } from '@angular/animations';
var NotificationsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NotificationsComponent, _super);
    function NotificationsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.qty = 0;
        _this.notifications = [];
        _this.show_notifications = false;
        _this.current_state = 'hidden';
        return _this;
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.get_mod_strings('application', this.page_lang, function () {
            _this.get_mod_strings('NotificationComponent', _this.page_lang, function () {
                _this.get_notifications();
            });
        });
    };
    NotificationsComponent.prototype.get_notifications = function () {
        var _this = this;
        this.user_service.get_notifications(this.current_user).subscribe(function (res) {
            console.log(res);
            if (res.status) {
                _this.notifications = res.data;
                _this.qty = _this.notifications.length;
            }
        });
    };
    NotificationsComponent.prototype.show_hide = function () {
        this.show_notifications = !this.show_notifications;
        this.current_state = (this.current_state == 'hidden' && this.qty > 0) ? 'visible' : 'hidden';
    };
    NotificationsComponent.prototype.remove_notification = function (id) {
        var _this = this;
        this.notifications = this.notifications.filter(function (el) {
            return el['id'] != id;
        });
        this.qty = this.notifications.length;
        if (this.qty == 0) {
            setTimeout(function () {
                _this.show_hide();
            }, 0);
            // this.show_hide();
        }
    };
    NotificationsComponent = tslib_1.__decorate([
        Component({
            selector: '.app-notifications',
            templateUrl: './notifications.component.html',
            styleUrls: ['./notifications.component.css'],
            animations: [
                trigger('single_notification', [
                    state('void', style({
                        transform: 'translateX(100%)'
                    })),
                    transition('*=>void', animate('0.1s'))
                ]),
                trigger('notification_container', [
                    state('hidden', style({
                        opacity: 0
                    })),
                    state('visible', style({
                        opacity: 1
                    })),
                    transition('hidden=>visible', animate('0.5s')),
                    transition('visible=>hidden', animate('0.5s'))
                ])
            ]
        })
    ], NotificationsComponent);
    return NotificationsComponent;
}(BaseComponent));
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map