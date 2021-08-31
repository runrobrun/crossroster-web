import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MeetsService} from '../services/meets.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Meet} from '../models/meet';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-create-meet',
  templateUrl: './create-meet.component.html',
  styleUrls: ['./create-meet.component.scss']
})
export class CreateMeetComponent implements OnInit {

  form = this.fb.group({
    hostSchool: ['', Validators.required],
    archived: [false],
    meetName: ['', Validators.required],
    locationUrl: [''],
    address: [''],
    city: [''],
    state: [''],
    zip: ['']
  })
  private meetId: string;
  selected = 'IA';

  constructor(private fb: FormBuilder,
              private meetsService: MeetsService,
              private afs: AngularFirestore,
              private router: Router) { }

  ngOnInit(): void {
    this.meetId = this.afs.createId();
  }

  onCreateMeet(): void {
    const val = this.form.value;
    const newMeet: Partial<Meet> = {
      hostSchool: val.hostSchool,
      archived: val.archived,
      meetName: val.meetName,
      locationUrl: val.locationUrl,
      address: val.address,
      city: val.city,
      state: val.state,
      zip: val.zip
    }

    this.meetsService.createMeet(newMeet, this.meetId)
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/meets');
        }),
        catchError( err => {
          console.log(err);
          alert('could not create meet');
          return throwError(err);
        })
      ).subscribe();
  }

}
