import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FilmService } from '../film.service';
import { LangService } from '../lang.service';
import { UserService } from '../user.service';
import { CommentService } from '../comment.service';
import { WatchComponent } from '../watch/watch.component';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
var CommentsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CommentsComponent, _super);
    function CommentsComponent(comment_service, http, user_service, router, route, lang_service, film_service) {
        var _this = _super.call(this, http, user_service, router, route, lang_service, film_service) || this;
        _this.comment_service = comment_service;
        _this.http = http;
        _this.user_service = user_service;
        _this.router = router;
        _this.route = route;
        _this.lang_service = lang_service;
        _this.film_service = film_service;
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
        _this.placeholder = '';
        _this.auto_complete = false;
        _this.suggests = [];
        _this.curr_pos = 0;
        return _this;
    }
    CommentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.get_mod_strings('application', this.page_lang, function () {
            _this.get_mod_strings(_this.component_name, _this.page_lang, function () {
                _this.get_mod_strings();
                _this.base_url = _this.user_service.get_base_url();
                _this.placeholder = _this.current_user ? _this.mod_strings.LBL_COMMENT_PLACEHOLDER : _this.mod_strings.LBL_COMMENT_PLACEHOLDER_NO_USER;
                _this.get_comments();
            });
        });
    };
    CommentsComponent.prototype.send_comment = function () {
        var _this = this;
        this.show_loader = true;
        this.comment_service.post_comment(this.current_user, this.movie_data.id, this.comment_value).subscribe(function (res) {
            _this.comment_value = '';
            if (res.status) {
                _this.get_comments(1, true);
            }
            else
                _this.handle_request_error(false, _this.app_strings['LBL_ERR_' + res.error] || _this.app_strings.LBL_ERR_500);
            _this.show_loader = false;
        }, function (error) {
            _this.comment_value = '';
            _this.handle_request_error();
        });
    };
    CommentsComponent.prototype.get_comments = function (limit, append) {
        var _this = this;
        if (limit === void 0) { limit = 10; }
        if (append === void 0) { append = false; }
        this.comment_service.get_comments(this.current_user, this.movie_data.id, limit).subscribe(function (res) {
            if (res.status) {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].editable = false;
                    if (!append)
                        _this.comments.push(res.data[i]);
                    else
                        _this.comments.unshift(res.data[i]);
                }
            }
        }, function (error) {
            _this.handle_request_error();
        });
    };
    CommentsComponent.prototype.enable_edit = function (nb) {
        this.comments[nb].editable = !this.comments[nb].editable;
    };
    CommentsComponent.prototype.get_confirmation = function (action, nb) {
        var params = {
            'delete_comment': {
                confirm_question: this.mod_strings.LBL_CONFIRM_DELETE,
            },
            'update_comment': {
                confirm_question: this.mod_strings.LBL_CONFIRM_UPDATE,
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
        this.comment_service.update_comment(this.current_user, this.comments[nb]).subscribe(function (res) {
            _this.comments[nb].editable = false;
            _this.show_loader = false;
            if (!res.status)
                _this.handle_request_error(false, _this.app_strings['LBL_ERR_' + res.error] || _this.app_strings.LBL_ERR_500);
        }, function (error) {
            _this.handle_request_error();
        });
    };
    CommentsComponent.prototype.delete_comment = function (nb) {
        var _this = this;
        this.show_loader = true;
        this.comment_service.delete_comment(this.current_user, this.comments[nb]).subscribe(function (res) {
            _this.comments[nb].editable = false;
            if (res.status) {
                _this.comments.splice(nb, 1);
            }
            else
                _this.handle_request_error(false, _this.app_strings['LBL_ERR_' + res.error] || _this.app_strings.LBL_ERR_500);
            _this.show_loader = false;
        }, function (error) {
            _this.handle_request_error();
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
    CommentsComponent.prototype.get_suggests = function (event, elem) {
        var _this = this;
        this.curr_pos = event.target.selectionStart;
        if (event.type == 'click') {
            this.curr_pos--;
            this.suggests = [];
        }
        else if (this.check_auto_complete(this.comment_value, this.curr_pos)) {
            this.comment_service.get_suggests().subscribe(function (res) {
                var word = _this.word_to_complete(_this.comment_value, _this.curr_pos);
                _this.suggests = res['users'].map(function (el) {
                    if ((el.first_name || el.last_name) && (el.first_name != '' || el.last_name != '')) {
                        el['initials'] = (el.first_name.toUpperCase().substr(0, 1) || '') + (el.last_name.toUpperCase().substr(0, 1) || '');
                        el['full_name'] = (el.first_name.toUpperCase() || '') + ' ' + (el.last_name.toUpperCase() || '');
                    }
                    else {
                        el['initials'] = el.login.substr(0, 1).toUpperCase();
                        el['full_name'] = el.login;
                    }
                });
                _this.suggests = res['users'].filter(function (el) {
                    return el.login.toLowerCase().indexOf(word) == 0 && el.login.toLowerCase() != word;
                });
            });
        }
        else
            this.suggests = [];
    };
    CommentsComponent.prototype.complete = function (suggest) {
        var at_pos = this.at_position(this.comment_value, this.curr_pos);
        this.comment_value = this.comment_value.substr(0, at_pos + 1) + suggest.login + this.comment_value.substr(this.curr_pos, this.comment_value.length);
        this.suggests = [];
    };
    CommentsComponent.prototype.check_auto_complete = function (str, pos) {
        var sub = str.substr(0, pos);
        var at_pos = this.at_position(str, pos);
        var at_sub = str.substr(at_pos, pos);
        return at_pos != -1 &&
            pos - at_pos > 1 &&
            (at_pos == 0 ||
                at_pos > sub.lastIndexOf(' ') ||
                at_pos > sub.lastIndexOf(',') ||
                at_pos > sub.lastIndexOf(';') ||
                at_pos > sub.lastIndexOf("\t") ||
                at_pos > sub.lastIndexOf('.')) &&
            at_sub.lastIndexOf(' ') == -1 &&
            at_sub.lastIndexOf(',') == -1 &&
            at_sub.lastIndexOf(';') == -1 &&
            at_sub.lastIndexOf("\t") == -1 &&
            at_sub.lastIndexOf('.') == -1;
    };
    CommentsComponent.prototype.word_to_complete = function (str, pos) {
        var at_pos = this.at_position(str, pos);
        return str.substr(at_pos + 1, pos).toLowerCase();
    };
    CommentsComponent.prototype.at_position = function (str, pos) {
        return str.substr(0, pos).lastIndexOf('@');
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
        }),
        tslib_1.__metadata("design:paramtypes", [CommentService, HttpClient, UserService, Router, ActivatedRoute, LangService, FilmService])
    ], CommentsComponent);
    return CommentsComponent;
}(WatchComponent));
export { CommentsComponent };
//# sourceMappingURL=comments.component.js.map