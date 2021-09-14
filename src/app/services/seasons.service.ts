import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Season} from '../models/season';
import {map} from 'rxjs/operators';
import {convertSnaps} from './db.utils';
import {Athlete} from '../models/athlete';
import {Meet} from '../models/meet';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  constructor(private db: AngularFirestore) { }

  loadActiveSeason(): Observable<Season | null> {
    return this.db.collection('seasons', ref => ref.where('active', '==', true))
      .get()
      .pipe(
        map( results => {
          const seasons = convertSnaps<Season>(results);
          return seasons.length === 1 ? seasons[0] : null;
        })
      )
  }

  getCurrentSeasonRoster(seasonId: string, gender: string) {
    return this.db.collection(`seasons/${{seasonId}}/roster`, ref => ref.where('gender', '==', gender))
      .get()
      .pipe(
          map(result => convertSnaps<Athlete>(result))
      )
  }

  findSeasonBySeasonYear(seasonYear: string): Observable<Season | null> {

    return this.db.collection('seasons', ref => ref.where('seasonYear', '==', parseInt(seasonYear)))
      .get()
      .pipe(
        map( results => {

          const seasons = convertSnaps<Season>(results);
          console.log("SEASONS: ", seasons);
          return seasons.length === 1 ? seasons[0] : null;
        })
      )
  }

  loadActiveSeasonSchedule(seasonId) {
    console.log("seasonId", seasonId);
    return this.db.collection(`seasons/${{seasonId}}/seasonSchedule`)
      .get()
      .pipe(
        map(result => convertSnaps<Meet>(result))
      )
  }
}
