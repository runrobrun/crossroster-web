import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { Observable } from 'rxjs';
import { SeasonsService } from '../services/seasons.service';
import { Athlete } from '../models/athlete';
import { Meet } from '../models/meet';
import { ActivatedRoute } from '@angular/router';
import { AthletesService } from "../services/athletes.service";

@Component({
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.scss'],
})
export class SeasonComponent implements OnInit {
    season: Season;
    seasonId: string;
    private seasonYear: string = this.route.snapshot.paramMap.get('seasonYear');
    roster: Athlete[];
    seasonMeets$: Observable<Meet[] | undefined>;
    maleAthletes$: Observable<Athlete[]>;
    femaleAthletes$: Observable<Athlete[]>;
    displayedColumns = ['meetName'];

    constructor( private seasonsService: SeasonsService,
                 private route: ActivatedRoute,
                 private athletesService: AthletesService) {
        this.season = this.route.snapshot.data.season;
    }

    ngOnInit(): void {
        this.loadMeets();
        this.loadAthletes();
    }

    loadMeets(): void {
        this.seasonMeets$ = this.seasonsService.loadActiveSeasonSchedule(this.season.id);
        console.log(this.seasonMeets$);
    }

    loadAthletes(): void {
      this.femaleAthletes$ = this.athletesService.loadActiveAthletesByGender('FEMALE');
      this.maleAthletes$ = this.athletesService.loadActiveAthletesByGender('MALE');
    }
}
