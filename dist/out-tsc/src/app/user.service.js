import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var UserService = /** @class */ (function () {
    // public current_user = null;
    function UserService() {
    }
    UserService.prototype.get_current_user = function (logged_out) {
        if (logged_out === void 0) { logged_out = false; }
        if (logged_out)
            return false;
        return {
            id: '42',
            login: 'rmalyavc',
            first_name: 'Roman',
            last_name: 'Malyavchik',
            age: '30',
        };
    };
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map