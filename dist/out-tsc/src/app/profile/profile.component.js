import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var ProfileComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ProfileComponent, _super);
    function ProfileComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.avatar = require('./assets/default/avatar.png');
        _this.form_data = {
            login: '',
            first_name: '',
            last_name: '',
            email: '',
            lang: '',
        };
        return _this;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.current_user)
            this.router.navigate(['']);
        else {
            this.route.params.subscribe(function (params) {
                _this.user_id = params['id'];
                _this.user_service.get_current_user().subscribe(function (data) {
                    _this.page_user = data[_this.user_id] || false;
                    _this.form_data = {
                        login: _this.page_user.login,
                        first_name: _this.page_user.first_name,
                        last_name: _this.page_user.last_name,
                        email: _this.page_user.email,
                        lang: _this.page_user.lang,
                    };
                    if (_this.page_user.avatar != '') {
                        console.log(data);
                        _this.avatar = data[_this.user_id].avatar;
                        console.log(_this.avatar);
                    }
                });
            });
        }
    };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: '.app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        })
    ], ProfileComponent);
    return ProfileComponent;
}(BaseComponent));
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map