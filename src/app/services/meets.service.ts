import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {convertSnaps} from './db.utils';
import {Meet} from '../models/meet';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeetsService {

  constructor(private db: AngularFirestore) { }

  loadMeets() {
    return this.db.collection(
      'meets', ref => ref.orderBy('meetName'))
      .get()
      .pipe(
        map(result => convertSnaps<Meet>(result))
      );
  }
}
