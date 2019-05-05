import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var ToolsComponent = /** @class */ (function () {
    function ToolsComponent() {
        this.name = 'test';
    }
    ToolsComponent.prototype.ngOnInit = function () {
        console.log('Current User Is');
        console.log(this.current_user);
        console.log(this.tool_ids);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], ToolsComponent.prototype, "tool_ids", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ToolsComponent.prototype, "current_user", void 0);
    ToolsComponent = tslib_1.__decorate([
        Component({
            selector: '.app-tools',
            templateUrl: './tools.component.html',
            styleUrls: ['./tools.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ToolsComponent);
    return ToolsComponent;
}());
export { ToolsComponent };
//# sourceMappingURL=tools.component.js.map