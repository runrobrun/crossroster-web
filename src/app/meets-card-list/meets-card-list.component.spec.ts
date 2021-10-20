import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetsCardListComponent } from './meets-card-list.component';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MeetsService } from "../services/meets.service";

describe('MeetsCardListComponent', () => {
    let component: MeetsCardListComponent;
    let fixture: ComponentFixture<MeetsCardListComponent>;

    beforeEach(async () => {
      let matDialogMock;
      let routerMock;
      let meetsServiceMock;
      await TestBed.configureTestingModule({
            providers: [
              {provide: MatDialog, useValue: matDialogMock},
              {provide: Router, useValue: routerMock},
              {provide: MeetsService, useValue: meetsServiceMock}
            ],
            declarations: [MeetsCardListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MeetsCardListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
