import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Athlete} from '../models/athlete';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'athletes-card-list',
  templateUrl: './athletes-card-list.component.html',
  styleUrls: ['./athletes-card-list.component.scss']
})
export class AthletesCardListComponent implements OnInit {
  @Input()
  athletes: Athlete[] | undefined;

  @Output()
  athleteEdited = new EventEmitter();

  @Output()
  athleteDeleted = new EventEmitter<Athlete>();

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

}
