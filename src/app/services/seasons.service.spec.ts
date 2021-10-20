import { TestBed } from '@angular/core/testing';

import { SeasonsService } from './seasons.service';
import { AngularFirestore } from "@angular/fire/firestore";

describe('SeasonsService', () => {
    let service: SeasonsService;

    beforeEach(() => {
      let angularFirestoreMock;
      TestBed.configureTestingModule({
          providers: [{provide: AngularFirestore, useValue: angularFirestoreMock}]
        });
        service = TestBed.inject(SeasonsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
