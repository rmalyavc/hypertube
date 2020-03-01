import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { FilmService } from '../film.service';
import { Router, ActivatedRoute } from '@angular/router';
var WatchComponent = /** @class */ (function (_super) {
    tslib_1.__extends(WatchComponent, _super);
    function WatchComponent(http, user_service, router, route, lang_service, film_service) {
        var _this = _super.call(this, user_service, router, route, lang_service) || this;
        _this.http = http;
        _this.user_service = user_service;
        _this.router = router;
        _this.route = route;
        _this.lang_service = lang_service;
        _this.film_service = film_service;
        _this.film_data = {};
        _this.no_img = require('../search-results/assets/no_image.png');
        return _this;
    }
    WatchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.get_mod_strings('application', this.page_lang, function () {
            _this.route.params.subscribe(function (params) {
                _this.page_id = params['id'];
                _this.film_service.get_film(_this.page_id).subscribe(function (res) {
                    _this.film_data.id = res['id'];
                    _this.film_data.name = res['title'];
                    _this.film_data.img = _this.no_img;
                    if (res['poster_path'])
                        _this.film_data.img = _this.film_service.config.images.base_url + 'original' + res['poster_path'];
                    _this.film_data.link = "";
                    _this.film_data.description = res['overview'];
                    _this.film_data.genres = res['genres'];
                    _this.film_data.year = res['release_date'];
                    if (_this.current_user) {
                        _this.film_service.save_visit(_this.film_data, _this.current_user).subscribe(function (res) {
                            if (!res.status)
                                _this.handle_request_error(false, _this.app_strings['_LBL_ERR_' + res.error] || _this.app_strings.LBL_ERR_500);
                        }, function (error) {
                            _this.handle_request_error();
                        });
                    }
                }, function (error) {
                    _this.handle_request_error();
                });
            });
        });
    };
    WatchComponent = tslib_1.__decorate([
        Component({
            selector: 'app-watch',
            templateUrl: './watch.component.html',
            styleUrls: ['./watch.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, UserService, Router, ActivatedRoute, LangService, FilmService])
    ], WatchComponent);
    return WatchComponent;
}(BaseComponent));
export { WatchComponent };
//# sourceMappingURL=watch.component.js.map