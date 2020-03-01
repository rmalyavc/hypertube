import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
describe('CommentService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CommentService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=comment.service.spec.js.map