import { TestBed } from '@angular/core/testing';
import { FilmService } from './film.service';
describe('FilmService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(FilmService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=film.service.spec.js.map