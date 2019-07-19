import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { WatchComponent } from '../watch/watch.component';
var CommentsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CommentsComponent, _super);
    function CommentsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.comments = [];
        _this.avatar = require('./assets/avatar.png');
        _this.base_url = '';
        _this.comment_value = '';
        _this.edit_icon = require('./assets/edit_icon.png');
        _this.delete_icon = require('./assets/delete_icon.png');
        _this.confirmation_info = {
            question: '',
            action: '',
            nb: 0
        };
        return _this;
    }
    // constructor(private film_service: FilmService, public lang_service: LangService) { }
    CommentsComponent.prototype.ngOnInit = function () {
        this.base_url = this.user_service.get_base_url() + '/';
        // if (this.comments.length == 0)
        this.get_comments();
        console.log(this.comments);
    };
    CommentsComponent.prototype.send_comment = function () {
        var _this = this;
        this.show_loader = true;
        this.film_service.post_comment(this.current_user, this.movie_data.id, this.comment_value).subscribe(function (res) {
            if (res.status) {
                _this.get_comments(1, true);
                // this.ngOnInit();
            }
            _this.comment_value = '';
            _this.show_loader = false;
        });
    };
    CommentsComponent.prototype.get_comments = function (limit, append) {
        var _this = this;
        if (limit === void 0) { limit = 10; }
        if (append === void 0) { append = false; }
        this.film_service.get_comments(this.current_user, this.movie_data.id, limit).subscribe(function (res) {
            if (res.status) {
                console.log(res);
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].editable = false;
                    if (!append)
                        _this.comments.push(res.data[i]);
                    else
                        _this.comments.unshift(res.data[i]);
                }
            }
        });
    };
    CommentsComponent.prototype.enable_edit = function (nb) {
        this.comments[nb].editable = !this.comments[nb].editable;
    };
    CommentsComponent.prototype.get_confirmation = function (action, nb) {
        var params = {
            'delete_comment': {
                confirm_question: 'Do you really want to remove this comment?',
            },
            'update_comment': {
                confirm_question: 'Do you really want to update this comment?',
            }
        };
        this.confirmation_info.action = action;
        this.confirmation_info.nb = nb;
        this.confirmation_info.question = params[action].confirm_question;
        this.show_fog = !this.show_fog;
    };
    CommentsComponent.prototype.update_comment = function (nb) {
        var _this = this;
        this.show_loader = true;
        this.film_service.update_comment(this.current_user, this.comments[nb]).subscribe(function (res) {
            _this.comments[nb].editable = false;
            _this.show_loader = false;
        });
    };
    CommentsComponent.prototype.delete_comment = function (nb) {
        var _this = this;
        this.show_loader = true;
        this.film_service.delete_comment(this.current_user, this.comments[nb]).subscribe(function (res) {
            _this.comments[nb].editable = false;
            if (res.status) {
                _this.comments.splice(nb, 1);
            }
            _this.show_loader = false;
        });
    };
    CommentsComponent.prototype.on_confirm = function (event) {
        this.show_fog = false;
        if (!event)
            return;
        else if (this.confirmation_info.action == 'delete_comment')
            this.delete_comment(this.confirmation_info.nb);
        else if (this.confirmation_info.action == 'update_comment')
            this.update_comment(this.confirmation_info.nb);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CommentsComponent.prototype, "movie_data", void 0);
    CommentsComponent = tslib_1.__decorate([
        Component({
            selector: '.app-comments',
            templateUrl: './comments.component.html',
            styleUrls: ['./comments.component.css']
        })
    ], CommentsComponent);
    return CommentsComponent;
}(WatchComponent));
export { CommentsComponent };
//# sourceMappingURL=comments.component.js.map