import { TestBed } from '@angular/core/testing';

import { MeetsService } from './meets.service';
import { AngularFirestore } from "@angular/fire/firestore";

describe('MeetsService', () => {
    let service: MeetsService;

    beforeEach(() => {
      let angularFirestoreMock;
      TestBed.configureTestingModule({
          providers: [{provide: AngularFirestore, useValue: angularFirestoreMock}]
        });
        service = TestBed.inject(MeetsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
