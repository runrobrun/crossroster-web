import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonComponent } from './season.component';
import { SeasonsService } from "../services/seasons.service";
import { ActivatedRoute } from "@angular/router";
import { AthletesService } from "../services/athletes.service";
import { Season } from "../models/season";

describe('SeasonComponent', () => {

    let component: SeasonComponent;
    let fixture: ComponentFixture<SeasonComponent>;

    beforeEach(async () => {
      let seasonsServiceMock = {loadActiveSeasonSchedule(){}};
      let athletesServiceMock = {loadActiveAthletesByGender(){}};
      await TestBed.configureTestingModule({
            declarations: [SeasonComponent],
            providers: [
              {provide: SeasonsService, useValue: seasonsServiceMock},
              {provide: ActivatedRoute, useValue: {
                  snapshot: {
                    paramMap: {
                      get(): string {
                        return '123';
                      },
                    },
                    data: {season: {id: 1}}
                  },
                },
              },
              {provide: AthletesService, useValue: athletesServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SeasonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
