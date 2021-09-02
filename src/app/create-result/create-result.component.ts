import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AthletesService} from '../services/athletes.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {MeetsService} from '../services/meets.service';
import {Meet} from '../models/meet';
import {Observable} from 'rxjs';
import {MeetResult} from '../models/meet-result';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-create-result',
  templateUrl: './create-result.component.html',
  styleUrls: ['./create-result.component.scss']
})
export class CreateResultComponent implements OnInit {
  private resultId: string;
  private foundMeet: Meet[];
  private athleteId: string = this.route.snapshot.paramMap.get('id')
  public meets$: Observable<Meet[]>;
  form = this.fb.group({
    distanceInMiles: ['', Validators.required],
    meet: ['', Validators.required],
    place: [''],
    season: [''],
    time: [''],
  })

  constructor(private fb: FormBuilder,
              private athleteService: AthletesService,
              private afs: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute,
              private meetsService: MeetsService) { }

  ngOnInit(): void {
    this.resultId = this.afs.createId();
    this.meets$ = this.meetsService.loadMeets(false);
  }

  getTime(res): number {
    const timeArray = res.time.split(':');
    return (parseInt(timeArray[0]) * 60) + parseInt(timeArray[1]);
  }

  onCreateMeet(): void {
    const val = this.form.value;
    const newResult: Partial<MeetResult> = {
      distanceInMiles: val.distanceInMiles,
      place: val.place,
      meetId: val.meet,
      season: val.season,
      time: val.time,
    }

    newResult.timeInSeconds = this.getTime(newResult.time);
    this.meetsService.getMeetById(newResult.meetId)
      .pipe(
      map(
        results => {
           return newResult.meetName = results.meetName
        }
      )
    ).subscribe();

    this.athleteService.createResult(newResult, this.resultId, this.athleteId);

  }

}
