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
        return _this;
    }
    WatchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.page_id = params['id'];
            _this.film_service.get_film(_this.page_id).subscribe(function (res) {
                _this.film_data.id = res.data.movie.id;
                _this.film_data.name = res.data.movie.title_long;
                _this.film_data.lang = res.data.movie.language;
                _this.film_data.img = res.data.movie.large_cover_image;
                _this.film_data.link = "";
                _this.film_data.description = res.data.movie.description_intro;
                _this.film_data.genres = res.data.movie.genres;
                _this.film_data.year = res.data.movie.year;
                // this.film_service.get_comments(this.page_id).subscribe(result => {
                // 	console.log(result);
                // });
                _this.film_service.save_visit(_this.film_data, _this.current_user).subscribe(function (res) {
                    console.log(res);
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