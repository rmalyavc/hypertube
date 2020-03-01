import { TestBed } from '@angular/core/testing';
import { LangService } from './lang.service';
describe('LangService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(LangService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=lang.service.spec.js.map