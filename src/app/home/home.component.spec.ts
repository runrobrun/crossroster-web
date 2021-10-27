import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MeetsService } from "../services/meets.service";
import { AngularFirestore } from "@angular/fire/firestore";

xdescribe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
      let meetsServiceMock;
      let angularFirestoreMock;
      await TestBed.configureTestingModule({
            providers: [
              {provide: MeetsService, useValue: meetsServiceMock},
              {provide: AngularFirestore, useValue: angularFirestoreMock},
            ],
            declarations: [HomeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
