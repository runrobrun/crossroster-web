import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {convertSnaps} from './db.utils';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Athlete} from '../models/athlete';

@Injectable({
  providedIn: 'root'
})
export class AthletesService {
  constructor(private db: AngularFirestore) {
  }

  loadAthletesByGender(gender: string): Observable<Athlete[]> {
    console.log("gender:" + gender);
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

}
