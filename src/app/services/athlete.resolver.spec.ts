import { TestBed } from '@angular/core/testing';

import { AthleteResolver } from './athlete.resolver';
import { AthletesService } from "./athletes.service";

describe('AthleteResolver', () => {
    let resolver: AthleteResolver;

    beforeEach(() => {
      let athletesServiceMock;
      TestBed.configureTestingModule({
          providers: [{provide: AthletesService, useValue: athletesServiceMock}]
        });
        resolver = TestBed.inject(AthleteResolver);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });
});
