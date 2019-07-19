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
        _this.edit_icon = require('./assets/default/edit_icon.png');
        _this.browse_icon = require('./assets/default/browse_icon.png');
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
        _this.update_status = true;
        _this.errors = [];
        _this.file_error = '';
        _this.tmp = '';
        _this.edit = false;
        _this.owner = false;
        _this.input_text = 'Choose your avatar';
        return _this;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.current_user)
            this.router.navigate(['']);
        else {
            this.check_login();
            this.file = null;
            this.file_error = '';
            this.route.params.subscribe(function (params) {
                _this.user_id = params['id'];
                _this.user_service.get_user_profile(_this.user_id, _this.current_user).subscribe(function (res) {
                    _this.page_user = res.data || false;
                    console.log(res);
                    // this.page_user = res['42'];
                    _this.owner = _this.page_user.uid == _this.current_user.uid;
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
                        _this.avatar = _this.user_service.get_base_url() + _this.page_user.avatar;
                        // this.avatar = this.page_user.avatar;
                    }
                    if (_this.history.length == 0)
                        _this.get_brawsing_history(5);
                });
            });
        }
    };
    ProfileComponent.prototype.file_selected = function (event) {
        console.log(event);
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
            this.input_text = this.file.name && this.file.name != '' ? this.file.name : 'Choose your avatar';
        }
    };
    ProfileComponent.prototype.upload_file = function () {
        var _this = this;
        var fd = new FormData();
        var _url = 'https://e973ac68.ngrok.io/user/update/image';
        fd.append('image', this.file, this.file.name);
        fd.append('token', this.current_user.token);
        this.http.post(_url, fd).subscribe(function (res) {
            console.log(res);
            if (res.status == true) {
                _this.file = null;
                document.getElementById('avatar_input').value = '';
                _this.edit = false;
                _this.ngOnInit();
            }
            else {
                _this.file_error = res.error;
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
        this.user_service.update_user(form_data).subscribe(function (res) {
            _this.update_status = res.status;
            _this.errors = [];
            if (res.errors) {
                var keys = Object.keys(res.errors);
                for (var i = 0; i < keys.length; i++) {
                    for (var j = 0; j < res.errors[keys[i]].length; j++) {
                        _this.tmp = res.errors[keys[i]][j];
                        _this.errors.push(_this.tmp);
                    }
                }
            }
            else {
                _this.change_editable();
                _this.ngOnInit();
            }
        });
    };
    ProfileComponent.prototype.change_editable = function () {
        if (this.owner)
            this.edit = !this.edit;
        else
            this.edit = false;
    };
    ProfileComponent.prototype.watch_movie = function (movie_id) {
        this.router.navigate(['/watch/' + movie_id]);
    };
    ProfileComponent.prototype.get_brawsing_history = function (limit, skip, order_by, sort_order) {
        var _this = this;
        if (limit === void 0) { limit = 20; }
        if (skip === void 0) { skip = 0; }
        if (order_by === void 0) { order_by = 'updated_at'; }
        if (sort_order === void 0) { sort_order = 'ASC'; }
        this.film_service.get_history(this.page_user, this.current_user, limit, skip, order_by, sort_order).subscribe(function (res) {
            if (res.status) {
                for (var i = 0; i < res.data.length; i++) {
                    _this.history.push(res.data[i]);
                }
            }
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