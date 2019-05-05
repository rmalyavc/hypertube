import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var ToolComponent = /** @class */ (function () {
    function ToolComponent() {
        this.tool_map = {
            login: {
                is_icon: true,
                icon: require('./assets/login.png'),
            },
            logout: {
                is_icon: true,
                icon: require('./assets/logout.png'),
            },
            profile: {
                is_icon: false,
            }
        };
    }
    ToolComponent.prototype.ngOnInit = function () {
        this.id = this.tool_id;
        this.icon = this.id != 'profile' ? this.tool_map[this.id].icon : false;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ToolComponent.prototype, "tool_id", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ToolComponent.prototype, "current_user", void 0);
    ToolComponent = tslib_1.__decorate([
        Component({
            selector: '.app-tool',
            templateUrl: './tool.component.html',
            styleUrls: ['./tool.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ToolComponent);
    return ToolComponent;
}());
export { ToolComponent };
//# sourceMappingURL=tool.component.js.map