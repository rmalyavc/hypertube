import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var CompleteRegistrationComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CompleteRegistrationComponent, _super);
    function CompleteRegistrationComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private error: string = '';
    CompleteRegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.get_mod_strings('application', this.page_lang, function () {
            _this.route.params.subscribe(function (params) {
                _this.user_service.complete_registration(params['token']).subscribe(function (res) {
                    if (res.status) {
                        res.data.token = res.token;
                        res.data.id = res.data.uid;
                        localStorage.setItem('current_user', JSON.stringify(res.data));
                        _this.redirect_to_home(true);
                    }
                    else
                        _this.handle_request_error(false, _this.app_strings['LBL_ERR_' + res.error] || _this.app_strings.LBL_ERR_500);
                }, function (error) {
                    _this.handle_request_error();
                });
            });
        });
    };
    CompleteRegistrationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-complete-registration',
            templateUrl: './complete-registration.component.html',
            styleUrls: ['./complete-registration.component.css']
        })
    ], CompleteRegistrationComponent);
    return CompleteRegistrationComponent;
}(BaseComponent));
export { CompleteRegistrationComponent };
//# sourceMappingURL=complete-registration.component.js.map