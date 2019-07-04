import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilmService } from '../film.service';
var ProfileComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ProfileComponent, _super);
    function ProfileComponent(http, user_service, router, route, lang_service, film_service) {
        var _this = _super.call(this, user_service, router, route, lang_service) || this;
        _this.http = http;
        _this.user_service = user_service;
        _this.router = router;
        _this.route = route;
        _this.lang_service = lang_service;
        _this.film_service = film_service;
        _this.avatar = require('./assets/default/avatar.png');
        _this.form_data = {
            uid: '',
            login: '',
            first_name: '',
            last_name: '',
            email: '',
            lang: '',
            notify: false,
            token: '',
        };
        _this.history = [];
        _this.file = null;
        _this.update_status = {
            status: true,
            errors: [''],
        };
        return _this;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.current_user)
            this.router.navigate(['']);
        else {
            this.check_login();
            this.route.params.subscribe(function (params) {
                _this.user_id = params['id'];
                _this.user_service.get_user_profile(_this.user_id, _this.current_user).subscribe(function (res) {
                    console.log(res);
                    _this.page_user = res.data || false;
                    if (_this.page_user)
                        _this.page_user.id = _this.page_user.uid;
                    _this.form_data = {
                        uid: _this.page_user.uid,
                        login: _this.page_user.login,
                        first_name: _this.page_user.first_name,
                        last_name: _this.page_user.last_name,
                        email: _this.page_user.email,
                        lang: _this.page_user.lang,
                        notify: _this.page_user.notify,
                        token: _this.current_user.token
                    };
                    if (_this.page_user.avatar && _this.page_user.avatar != '') {
                        _this.avatar = _this.user_service.get_base_url() + '/' + _this.page_user.avatar;
                    }
                    // var history = this.history;
                    // this.history = this.film_service.get_history(this.current_user.id, 5).subscribe(data => {
                    // 	for (var i = 0; i < data.length; i++) {
                    // 		history.push(data[i]);
                    // 	}
                    // 	// console.log(history);
                    // });
                    // console.log(this.history);
                });
            });
        }
        // setTimeout(() => {
        // 	console.log(this.history);
        // }, 3000);
    };
    ProfileComponent.prototype.file_selected = function (event) {
        this.file = event.target.files[0];
        this.upload_file();
        // console.log(event);
    };
    ProfileComponent.prototype.upload_file = function () {
        var _this = this;
        var fd = new FormData();
        var _url = 'https://bc875342.ngrok.io/user/update/image';
        fd.append('image', this.file, this.file.name);
        fd.append('token', this.current_user.token);
        this.http.post(_url, fd).subscribe(function (res) {
            console.log(res);
            if (res.status == true) {
                // this.page_user = {};
                // this.avatar = '';
                _this.ngOnInit();
            }
        });
    };
    ProfileComponent.prototype.trigger_file = function () {
        document.getElementById('avatar_input').click();
    };
    ProfileComponent.prototype.update = function () {
        var _this = this;
        var form_data = Object.assign({}, this.form_data);
        delete form_data.login;
        // delete form_data.email;
        this.user_service.update_user(form_data).subscribe(function (res) {
            console.log(res);
            _this.update_status.status = res.status;
            _this.update_status.errors = [];
            if (res.errors) {
                var keys = Object.keys(res.errors);
                for (var i = 0; i < keys.length; i++) {
                    for (var j = 0; j < res.errors[keys[i]].length; j++) {
                        console.log(_this.update_status);
                        console.log(res.errors[keys[i]][j]);
                        _this.update_status.errors.push(res.errors[keys[i]][j]);
                    }
                }
            }
            else
                _this.update_status.errors = [];
            _this.update_status.errors = res.errors;
            _this.ngOnInit();
        });
    };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: '.app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, UserService, Router, ActivatedRoute, LangService, FilmService])
    ], ProfileComponent);
    return ProfileComponent;
}(BaseComponent));
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map