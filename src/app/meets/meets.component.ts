import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Meet} from '../models/meet';
import {AngularFirestore} from '@angular/fire/firestore';
import {MeetsService} from '../services/meets.service';

@Component({
  selector: 'app-meets',
  templateUrl: './meets.component.html',
  styleUrls: ['./meets.component.scss']
})
export class MeetsComponent implements OnInit {
  meets$: Observable<Meet[]>;
  selectedSeason: number;

  constructor(private db: AngularFirestore,
              private meetsService: MeetsService) { }

  ngOnInit(): void {
    this.reloadMeets();
  }

  reloadMeets(): void {
    this.meets$ = this.meetsService.loadMeets()
  }

}
