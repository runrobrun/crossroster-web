import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetsComponent } from './meets.component';
import { AngularFirestore } from "@angular/fire/firestore";
import { MeetsService } from "../services/meets.service";

describe('MeetsComponent', () => {
    let component: MeetsComponent;
    let fixture: ComponentFixture<MeetsComponent>;

    beforeEach(async () => {
      let angularFirestoreMock;
      let meetsServiceMock = {loadMeets(){}};
      await TestBed.configureTestingModule({
          providers: [
            {provide: AngularFirestore, useValue: angularFirestoreMock},
            {provide: MeetsService, useValue: meetsServiceMock}
          ],
            declarations: [MeetsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MeetsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
