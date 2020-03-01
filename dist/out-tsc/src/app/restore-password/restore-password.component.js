import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';
var RestorePasswordComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RestorePasswordComponent, _super);
    function RestorePasswordComponent(user_service, router, route, lang_service) {
        var _this = _super.call(this, user_service, router, route, lang_service) || this;
        _this.user_service = user_service;
        _this.router = router;
        _this.route = route;
        _this.lang_service = lang_service;
        _this.action = '';
        _this.form_data = {
            action: '',
            token: '',
            password: '',
            password_confirmation: '',
            old_password: '',
            email: '',
            lang: ''
        };
        _this.message = '';
        _this.get_mod_strings();
        return _this;
    }
    RestorePasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form_data.lang = this.page_lang;
        this.get_mod_strings('application', this.page_lang, function () {
            _this.get_mod_strings(_this.component_name, _this.page_lang, function () {
                _this.errors = [];
                _this.route.params.subscribe(function (params) {
                    _this.action = params['action'];
                    _this.form_data.action = _this.action;
                    if (_this.action == 'recover') {
                        _this.route.queryParams.subscribe(function (params) {
                            if (!params.token || params.token == '') {
                                var obj = _this;
                                var interval_id = setInterval(function () {
                                    if (Object.keys(obj.mod_strings).length > 0) {
                                        clearInterval(interval_id);
                                        obj.errors.push(obj.mod_strings.LBL_ERR_NO_TOKEN);
                                    }
                                }, 50);
                            }
                            else {
                                _this.form_data.token = params.token;
                            }
                        });
                    }
                    else if (_this.action == 'change') {
                        _this.check_login();
                        _this.form_data.uid = _this.current_user.uid;
                        _this.form_data.token = _this.current_user.token;
                    }
                    else if (_this.action != 'forgot')
                        _this.router.navigate(['not_found']);
                });
            });
        });
    };
    RestorePasswordComponent.prototype.recover_password = function () {
        var _this = this;
        this.user_service.change_password(this.form_data).subscribe(function (res) {
            if (res && res.status) {
                if (_this.action == 'forgot')
                    _this.message = _this.mod_strings.LBL_LINK_SENT;
                else if (_this.action == 'change')
                    _this.message = _this.mod_strings['LBL_PASSWORD_CHANGED'];
                else if (_this.action == 'recover' && res.data.login) {
                    _this.form_data.login = res.data.login;
                    _this.login();
                }
            }
            else {
                if (typeof res.error == 'object') {
                    var err_keys = Object.keys(res.error);
                    for (var i = 0; i < err_keys.length; i++) {
                        var key = err_keys[i];
                        for (var j = 0; res.error[key][j]; j++) {
                            _this.errors.push(res.error[key][j]);
                        }
                    }
                }
                else
                    _this.errors.push(_this.app_strings['LBL_ERR_' + res.error] || _this.app_strings.LBL_ERR_500);
            }
        }, function (error) {
            _this.handle_request_error();
        });
    };
    RestorePasswordComponent = tslib_1.__decorate([
        Component({
            selector: '.app-restore-password',
            templateUrl: './restore-password.component.html',
            styleUrls: ['./restore-password.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router, ActivatedRoute, LangService])
    ], RestorePasswordComponent);
    return RestorePasswordComponent;
}(LoginComponent));
export { RestorePasswordComponent };
//# sourceMappingURL=restore-password.component.js.map