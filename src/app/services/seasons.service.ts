import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Season } from '../models/season';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db.utils';
import { Meet } from '../models/meet';

@Injectable({
    providedIn: 'root',
})
export class SeasonsService {
    constructor(private db: AngularFirestore) {}

    findSeasonBySeasonYear(seasonYear: string): Observable<Season | null> {
        return this.db
            .collection('seasons', (ref) => ref.where('seasonYear', '==', parseInt(seasonYear)))
            .get()
            .pipe(
                map((results) => {
                    const seasons = convertSnaps<Season>(results);
                    return seasons.length === 1 ? seasons[0] : null;
                })
            );
    }

    loadActiveSeasonSchedule(seasonId) {
        return this.db
            .collection(`seasons/${seasonId}/seasonSchedule`)
            .get()
            .pipe(
                map((result) => {
                    const meets = convertSnaps<Meet>(result);
                    return meets.length >= 1 ? meets : null;
                })
            );
    }
}
