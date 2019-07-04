import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FilmService } from '../film.service';
import { LangService } from '../lang.service';
var CommentsComponent = /** @class */ (function () {
    function CommentsComponent(film_service, lang_service) {
        this.film_service = film_service;
        this.lang_service = lang_service;
        this.comments = {};
    }
    CommentsComponent.prototype.ngOnInit = function () {
        // this.comments = this.film_service.get_comments(this.film_data.id).subscribe(res => {
        // 	console.log(res);
        // });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CommentsComponent.prototype, "film_data", void 0);
    CommentsComponent = tslib_1.__decorate([
        Component({
            selector: '.app-comments',
            templateUrl: './comments.component.html',
            styleUrls: ['./comments.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FilmService, LangService])
    ], CommentsComponent);
    return CommentsComponent;
}());
export { CommentsComponent };
//# sourceMappingURL=comments.component.js.map