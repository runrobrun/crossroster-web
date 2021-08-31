import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {convertSnaps} from './db.utils';
import {Meet} from '../models/meet';
import {map} from 'rxjs/operators';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetsService {

  constructor(private db: AngularFirestore) { }

  loadMeets(archived: boolean) {
    return this.db.collection(
      'meets', ref => ref.where('archived', '==', archived).orderBy('meetName'))
      .get()
      .pipe(
        map(result => convertSnaps<Meet>(result))
      );
  }

  updateMeet(meetId: string, changes: any) {
    return from(this.db.doc(`meets/${meetId}`).update(changes));
  }

  createMeet(newMeet: Partial<Meet>, meetId?: string): Observable<any> {
    let save$: Observable<any>;
    if (meetId) {
      save$ = from(this.db.doc(`meets/${meetId}`).set(newMeet));
    } else {
      save$ = from(this.db.collection('meets').add(newMeet));
    }

    return save$
          .pipe(
            map(res => {
              return {
                id: meetId ?? res.id,
                ...newMeet
              };
            })
          );
  }
}
