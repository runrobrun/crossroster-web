import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AthletesService } from '../services/athletes.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetsService } from '../services/meets.service';
import { Meet } from '../models/meet';
import { Observable, throwError } from 'rxjs';
import { MeetResult } from '../models/meet-result';
import { catchError, tap } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'app-create-result',
    templateUrl: './create-result.component.html',
    styleUrls: ['./create-result.component.scss'],
})
export class CreateResultComponent implements OnInit {
    private resultId: string;
    private athleteId: string = this.route.snapshot.paramMap.get('id');
    public meets$: Observable<Meet[]>;
    // private meet: Meet;
    private meetName: string;
    form = this.fb.group({
        distanceInMiles: [3.1, Validators.required],
        meet: ['', Validators.required],
        place: [],
        season: [2020],
        time: [''],
    });

    constructor(
        private fb: FormBuilder,
        private athleteService: AthletesService,
        private afs: AngularFirestore,
        private router: Router,
        private route: ActivatedRoute,
        private meetsService: MeetsService
    ) {}

    ngOnInit(): void {
        this.resultId = this.afs.createId();
        this.meets$ = this.meetsService.loadMeets(false);
    }

    getTime(res): number {
        const timeArray = res.split(':');
        return parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
    }

    onChange(ev: MatSelectChange) {
        this.meetName = (ev.source.selected as MatOption).viewValue;
    }

    onCreateMeet(): void {
        const val = this.form.value;

        const newResult: Partial<MeetResult> = {
            distanceInMiles: parseInt(val.distanceInMiles),
            place: parseInt(val.place),
            meetId: val.meet,
            season: parseInt(val.season),
            time: val.time,
            meetName: this.meetName,
            timeInSeconds: null,
        };

        newResult.timeInSeconds = this.getTime(newResult.time);

        this.athleteService
            .createResult(newResult, this.resultId, this.athleteId)
            .pipe(
                tap(() => {
                    this.router.navigateByUrl('/athletes');
                }),
                catchError((err) => {
                    console.log(err);
                    alert('could not create result');
                    return throwError(err);
                })
            )
            .subscribe();
    }
}
