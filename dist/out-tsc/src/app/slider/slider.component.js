import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { trigger, state, transition, style, animate } from '@angular/animations';
var SliderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SliderComponent, _super);
    function SliderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 0;
        _this.curr_set = [];
        _this.state_name = 'still';
        _this.curr_index = 0;
        _this.range = [];
        return _this;
    }
    SliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.film_service.lang = this.page_lang;
        this.get_mod_strings('application', this.page_lang, function () {
            _this.film_service.search_movies().subscribe(function (res) {
                for (var i = 0; i < res.results.length; i++) {
                    if (res.results[i].poster_path)
                        res.results[i].img = _this.film_service.config.images.base_url + 'original' + res.results[i].poster_path;
                    else
                        res.results[i].img = _this.no_img;
                }
                _this.results = res.results.slice(0, 20);
                _this.start_slider();
            }, function (error) {
                _this.handle_request_error();
            });
        });
    };
    SliderComponent.prototype.start_slider = function () {
        var obj = this;
        this.range = [];
        for (var i = this.count; i < this.count + 4; i++) {
            console.log(i);
            this.range.push(i);
        }
        // this.curr_set = this.results.slice(this.count, this.count + 4);
        this.interval_id = setInterval(function () {
            obj.change_slide(4);
        }, 5000);
    };
    SliderComponent.prototype.change_slide = function (nb, manual) {
        var _this = this;
        if (manual === void 0) { manual = false; }
        // if (nb < 0)
        // 	this.state_name = 'prev';
        // else
        // 	this.state_name = 'next';
        // setTimeout(() => {
        // 	this.state_name = 'still';
        // }, 0);
        this.curr_set = [];
        this.range = [];
        setTimeout(function () {
            if (manual)
                clearInterval(_this.interval_id);
            if (_this.count + nb > _this.results.length - 1)
                _this.count = 0;
            else if (_this.count + nb < 0)
                _this.count = _this.results.length - 4;
            else
                _this.count += nb;
            // this.curr_set = this.results.slice(this.count, this.count + 4);
            if (manual)
                _this.start_slider();
            else {
                for (var i = _this.count; i < _this.count + 4; i++) {
                    _this.range.push(i);
                }
            }
        }, 250);
    };
    SliderComponent = tslib_1.__decorate([
        Component({
            selector: '.app-slider',
            templateUrl: './slider.component.html',
            styleUrls: ['./slider.component.css'],
            animations: [
                // trigger('prev_slide', [
                // transition('void => prev', [
                // 	style({transform: 'translateX(100%)'}),
                // 	animate('0.2s ease-out')
                // ]),
                // transition('void => next', [
                // 	style({transform: 'translateX(-100%)'}),
                // 	animate('0.2s ease-out')
                // ]),
                // transition('prev => void', [
                // 	animate('0.2s ease-out', style({transform: 'translateX(-100%)'}))
                // ]),
                // transition('next => void', [
                // 	animate('0.2s ease-out', style({transform: 'translateX(100%)'}))
                // ]),
                trigger('prev_slide', [
                    state('prev', style({
                        transform: 'translateX(-100%)'
                    })),
                    state('next', style({
                        transform: 'translateX(100%)'
                    })),
                    state('still', style({
                        transform: 'translateX(0%)'
                    })),
                    transition('still=>next', animate('0.2s')),
                    transition('still=>prev', animate('0.2s'))
                ])
                // ])
            ]
        })
    ], SliderComponent);
    return SliderComponent;
}(SearchResultsComponent));
export { SliderComponent };
//# sourceMappingURL=slider.component.js.map