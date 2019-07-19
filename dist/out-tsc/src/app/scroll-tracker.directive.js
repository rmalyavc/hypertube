import * as tslib_1 from "tslib";
import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
var ScrollTracker = /** @class */ (function () {
    function ScrollTracker() {
        this.scrolled = new EventEmitter();
    }
    ScrollTracker.prototype.onScroll = function (event) {
        var tracker = event.target;
        var endReached = false;
        var limit = tracker.scrollHeight - tracker.clientHeight;
        if (event.target.scrollTop > limit - 1) {
            endReached = true;
        }
        this.scrolled.emit({
            pos: event.target.scrollTop,
            endReached: endReached
        });
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ScrollTracker.prototype, "scrolled", void 0);
    tslib_1.__decorate([
        HostListener('scroll', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ScrollTracker.prototype, "onScroll", null);
    ScrollTracker = tslib_1.__decorate([
        Directive({
            selector: '[scrollTracker]',
        })
    ], ScrollTracker);
    return ScrollTracker;
}());
export { ScrollTracker };
//# sourceMappingURL=scroll-tracker.directive.js.map