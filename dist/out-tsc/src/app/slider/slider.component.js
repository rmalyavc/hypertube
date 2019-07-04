import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { trigger, transition, style, animate } from '@angular/animations';
var SliderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SliderComponent, _super);
    function SliderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 0;
        _this.curr_set = [];
        _this.state_name = 'next';
        _this.curr_index = 0;
        return _this;
    }
    // constructor(private search_service: SearchService) { }
    SliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.results = this.search_service.get_results(false, 'download_count').subscribe(function (res) {
            _this.results = res;
            _this.start_slider();
        });
    };
    SliderComponent.prototype.start_slider = function () {
        var obj = this;
        this.curr_set = this.results.data.movies.slice(this.count, this.count + 4);
        this.interval_id = setInterval(function () {
            obj.change_slide(4);
        }, 5000);
    };
    SliderComponent.prototype.change_slide = function (nb, manual) {
        var _this = this;
        if (manual === void 0) { manual = false; }
        if (nb < 0)
            this.state_name = 'prev';
        else
            this.state_name = 'next';
        this.curr_set = [];
        setTimeout(function () {
            if (manual)
                clearInterval(_this.interval_id);
            if (_this.count + nb > _this.results.data.movies.length - 1)
                _this.count = 0;
            else if (_this.count + nb < 0)
                _this.count = _this.results.data.movies.length - 4;
            else
                _this.count += nb;
            _this.curr_set = _this.results.data.movies.slice(_this.count, _this.count + 4);
            if (manual)
                _this.start_slider();
        }, 250);
    };
    SliderComponent = tslib_1.__decorate([
        Component({
            selector: '.app-slider',
            templateUrl: './slider.component.html',
            styleUrls: ['./slider.component.css'],
            animations: [
                trigger('prev_slide', [
                    transition('void => prev', [
                        style({ transform: 'translateX(100%)' }),
                        animate('0.2s ease-out')
                    ]),
                    transition('void => next', [
                        style({ transform: 'translateX(-100%)' }),
                        animate('0.2s ease-out')
                    ]),
                    transition('prev => void', [
                        animate('0.2s ease-out', style({ transform: 'translateX(-100%)' }))
                    ]),
                    transition('next => void', [
                        animate('0.2s ease-out', style({ transform: 'translateX(100%)' }))
                    ]),
                ])
            ]
        })
    ], SliderComponent);
    return SliderComponent;
}(SearchResultsComponent));
export { SliderComponent };
//# sourceMappingURL=slider.component.js.map