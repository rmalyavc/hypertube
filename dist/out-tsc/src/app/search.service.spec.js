import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
describe('SearchService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SearchService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=search.service.spec.js.map