import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var ToolComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToolComponent, _super);
    function ToolComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tool_map = {
            login: {
                is_icon: true,
                icon: require('./assets/login.png'),
                action: _this.redirect_to_login,
            },
            logout: {
                is_icon: true,
                icon: require('./assets/logout.png'),
                action: _this.logout,
            },
            profile: {
                is_icon: false,
            },
            lang: {
                is_icon: false,
            }
        };
        return _this;
    }
    // constructor() {
    // }
    ToolComponent.prototype.ngOnInit = function () {
        this.get_mod_strings('application');
        this.id = this.tool_id;
        this.action = !this.tool_map[this.id].is_icon ? false : this.tool_map[this.id].action;
        this.icon = this.id != 'profile' ? this.tool_map[this.id].icon : false;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ToolComponent.prototype, "tool_id", void 0);
    ToolComponent = tslib_1.__decorate([
        Component({
            selector: '.app-tool',
            templateUrl: './tool.component.html',
            styleUrls: ['./tool.component.css']
        })
    ], ToolComponent);
    return ToolComponent;
}(BaseComponent));
export { ToolComponent };
//# sourceMappingURL=tool.component.js.map