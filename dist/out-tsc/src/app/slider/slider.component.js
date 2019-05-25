import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var SliderComponent = /** @class */ (function () {
    function SliderComponent() {
        this.images = [
            '/assets/slider/slider1.jpg',
            '/assets/slider/slider2.jpg',
            '/assets/slider/slider3.jpg',
            '/assets/slider/slider4.jpg',
            '/assets/slider/slider5.jpg'
        ];
    }
    SliderComponent.prototype.ngOnInit = function () {
        this.count = 0;
        this.img = this.images[this.count];
        this.start_slider();
    };
    SliderComponent.prototype.start_slider = function () {
        var obj = this;
        this.interval_id = setInterval(function () {
            obj.change_slide(1);
        }, 3000);
    };
    SliderComponent.prototype.change_slide = function (nb, manual) {
        if (manual === void 0) { manual = false; }
        if (manual)
            clearInterval(this.interval_id);
        if (this.count + nb > this.images.length - 1)
            this.count = 0;
        else if (this.count + nb < 0)
            this.count = this.images.length - 1;
        else
            this.count += nb;
        this.img = this.images[this.count];
        if (manual)
            this.start_slider();
    };
    SliderComponent = tslib_1.__decorate([
        Component({
            selector: '.app-slider',
            templateUrl: './slider.component.html',
            styleUrls: ['./slider.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SliderComponent);
    return SliderComponent;
}());
export { SliderComponent };
//# sourceMappingURL=slider.component.js.map