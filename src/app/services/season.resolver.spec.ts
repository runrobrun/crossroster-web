import { TestBed } from '@angular/core/testing';

import { SeasonResolver } from './season.resolver';
import { SeasonsService } from "./seasons.service";

describe('SeasonResolver', () => {
    let resolver: SeasonResolver;

    beforeEach(() => {
      let seasonsServiceMock;
      TestBed.configureTestingModule({
          providers: [{provide: SeasonsService, useValue: seasonsServiceMock}]
        });
        resolver = TestBed.inject(SeasonResolver);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });
});
