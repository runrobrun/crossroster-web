import { Component, OnInit } from '@angular/core';
import {Athlete} from '../models/athlete';
import {ActivatedRoute} from '@angular/router';
import {AthletesService} from '../services/athletes.service';
import {finalize} from 'rxjs/operators';
import {MeetResult} from '../models/meet-result';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss']
})
export class AthleteComponent implements OnInit {

  athlete: Athlete;
  meetResults: MeetResult[];
  loading: boolean = false;
  lastPageLoaded = 0;

  displayedColumns = ['meetName', 'time', 'place'];

  constructor(private route: ActivatedRoute,
              private athletesService: AthletesService) { }

  ngOnInit(): void {
    this.athlete = this.route.snapshot.data.athlete;
    this.loading = true;

    console.log("Athlete: ", this.athlete);
    this.athletesService.findMeetResults(this.athlete.id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        results => {this.meetResults = results;console.log('result', results);}

      )
  }

  loadMore(): void {
    this.lastPageLoaded++;
    this.loading = true;
    this.athletesService.findMeetResults(this.athlete.id, 'asc', this.lastPageLoaded)
      .pipe(
        finalize( () => this.loading = false)
      )
      .subscribe(results => this.meetResults = this.meetResults.concat(results));
  }

}
