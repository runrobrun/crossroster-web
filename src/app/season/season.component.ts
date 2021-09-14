import { Component, OnInit } from '@angular/core';
import {Season} from '../models/season';
import {Observable} from 'rxjs';
import {SeasonsService} from '../services/seasons.service';
import {Athlete} from '../models/athlete';
import {Meet} from '../models/meet';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {
  season: Season;
  seasonId: string;
  private seasonYear: string = this.route.snapshot.paramMap.get('seasonYear')
  roster: Athlete[];
  seasonMeets$: Observable<Meet[]>;

  constructor(private seasonsService: SeasonsService,
              private route: ActivatedRoute) {
    this.season = this.route.snapshot.data.season;
    // this.seasonsService.loadActiveSeason()
    //   .subscribe(
    //     results => {
    //       this.season = results;
    //       this.seasonId = results.id;
    //     }
    //   );
  }

  ngOnInit(): void {
    this.loadMeets();
  }

  loadMeets(): void {
    this.seasonMeets$ = this.seasonsService.loadActiveSeasonSchedule(this.seasonYear);
  }

}
