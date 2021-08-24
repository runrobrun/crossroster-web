import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Athlete} from '../models/athlete';
import {AthletesService} from '../services/athletes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  maleAthletes$: Observable<Athlete[]>;

  femaleAthletes$: Observable<Athlete[]>;

  constructor(private db: AngularFirestore,
              private athletesService: AthletesService) { }

  ngOnInit(): void {
    this.reloadAthletes();
  }

  reloadAthletes() {
    this.femaleAthletes$ = this.athletesService.loadAthletesByGender('FEMALE');
    this.maleAthletes$ = this.athletesService.loadAthletesByGender('MALE');
  }


}
