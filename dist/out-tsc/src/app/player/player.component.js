import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var PlayerComponent = /** @class */ (function () {
    function PlayerComponent() {
        this.play = require('./assets/play.png');
    }
    PlayerComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PlayerComponent.prototype, "film_data", void 0);
    PlayerComponent = tslib_1.__decorate([
        Component({
            selector: '.app-player',
            templateUrl: './player.component.html',
            styleUrls: ['./player.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PlayerComponent);
    return PlayerComponent;
}());
export { PlayerComponent };
//# sourceMappingURL=player.component.js.map