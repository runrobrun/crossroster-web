import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {convertSnaps} from './db.utils';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Athlete} from '../models/athlete';
import {MeetResult} from '../models/meet-result';
import firebase from 'firebase';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})
export class AthletesService {
  constructor(private db: AngularFirestore) {
  }

  findMeetResults(athleteId: string, sortOrder: OrderByDirection = 'asc',
              pageNumber = 0, pageSize = 3): Observable<MeetResult[]> {
    return this.db.collection(`athletes/${athleteId}/meet-results`,
      ref => ref.orderBy('date', sortOrder)
        .limit(pageSize)
        .startAfter(pageNumber * pageSize))
      .get()
      .pipe(
        map(results => convertSnaps<MeetResult>(results))
      );
  }

  loadAthletesByGender(gender: string): Observable<Athlete[]> {
    return this.db.collection(
      'athletes',
      ref => ref.where('gender', '==', gender)
        .orderBy('lastName')
    )
      .get()
      .pipe(
        map(result => convertSnaps<Athlete>(result))
      );
  }

  deleteAthlete(athleteId: string): Observable<any> {
    return from(this.db.doc(`athletes/${athleteId}`).delete());
  }

  createAthlete(newAthlete: Partial<Athlete>, athleteId?: string): Observable<any> {

          let save$: Observable<any>;

          if (athleteId) {
            save$ = from(this.db.doc(`athletes/${athleteId}`).set(newAthlete));
          } else {
            save$ = from(this.db.collection('athletes').add(newAthlete));
          }

          return save$
            .pipe(
              map(res => {
                return {
                  id: athleteId ?? res.id,
                  ...newAthlete
                };
              })
            );

  }

  updateAthlete(athleteId: string, changes: Partial<Athlete>): Observable<any> {
    return from(this.db.doc(`athletes/${athleteId}`).update(changes));
  }

  findAthleteByUrl(profileUrl: string): Observable<Athlete | null> {
    return this.db.collection('athletes',
      ref => ref.where('profileUrl', '==', profileUrl))
      .get()
      .pipe(
        map(results => {
          const athletes = convertSnaps<Athlete>(results);
          return athletes.length === 1 ? athletes[0] : null;

        })
      );
  }

  getLeadersList(): Observable<Athlete[]> {
    return this.db.collection('athletes', ref => ref.where('isTeamLeader', '==', true)
      .orderBy('lastName'))
      .get()
      .pipe(
        map(result => convertSnaps<Athlete>(result))
      )
  }

}
