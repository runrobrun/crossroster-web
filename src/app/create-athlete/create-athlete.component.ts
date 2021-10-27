import { Component, OnInit } from '@angular/core';
import { AthletesService } from '../services/athletes.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Athlete } from '../models/athlete';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
    selector: 'create-athlete',
    templateUrl: 'create-athlete.component.html',
    styleUrls: ['create-athlete.component.scss'],
})
export class CreateAthleteComponent implements OnInit {
    athleteForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        gradYear: ['', Validators.required],
        active: [true],
        primaryPhone: [''],
        secondaryPhone: [''],
        email: [''],
        uniformBottomSize: [''],
        uniformTopSize: [''],
        warmUpTopSize: [''],
        bagNumber: [''],
        profileUrl: [''],
        tshirtSize: [''],
        isTeamLeader: [false],
        teamLeader: [''],
        physicalCurrent: [true],
        physicalExpiryDate: [null],
        bio: [''],
        notes: [''],
    });
    private athleteId: string;
    isTeamLeader: boolean = false;
    leaders$: Observable<Athlete[]>;

    constructor(
        private fb: FormBuilder,
        private athletesService: AthletesService,
        private afs: AngularFirestore,
        private router: Router,
        private storage: AngularFireStorage
    ) {}

    ngOnInit(): void {
        this.athleteId = this.afs.createId();
        this.leaders$ = this.athletesService.getLeadersList();
    }

    onCreateAthlete(): void {
        const val = this.athleteForm.value;
        const newAthlete: Partial<Athlete> = {
            firstName: val.firstName,
            lastName: val.lastName,
            gender: val.gender,
            gradYear: val.gradYear,
            active: val.active,
            primaryPhone: val.primaryPhone,
            secondaryPhone: val.secondaryPhone,
            email: val.email,
            uniformBottomSize: val.uniformBottomSize,
            uniformTopSize: val.uniformTopSize,
            warmUpTopSize: val.warmUpTopSize,
            bagNumber: val.bagNumber,
            profileUrl: val.profileUrl,
            tshirtSize: val.tshirtSize,
            isTeamLeader: val.isTeamLeader,
            teamLeader: val.teamLeader,
            physicalCurrent: val.physicalCurrent,
            bio: val.bio,
            notes: val.notes,
        };

        newAthlete.physicalExpiryDate = Timestamp.fromDate(this.athleteForm.value.physicalExpiryDate);
        newAthlete.profileUrl = val.firstName.toLowerCase() + '-' + val.lastName.toLowerCase();

        this.athletesService
            .createAthlete(newAthlete, this.athleteId)
            .pipe(
                tap(() => {
                    this.router.navigateByUrl('/');
                }),
                catchError((err) => {
                    console.log(err);
                    alert('could not create athlete');
                    return throwError(err);
                })
            )
            .subscribe();
    }

    setTeamLeaderFlag(): void {
        this.isTeamLeader = !this.isTeamLeader;
    }

  uploadPicture(event) {
    const file:File = event.target.files[0];
    const filePath =`athletes/${this.athleteId}/${file.name}`;

    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });

    task.snapshotChanges().subscribe();

  }
}
