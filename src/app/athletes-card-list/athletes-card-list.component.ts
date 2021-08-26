import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Athlete} from '../models/athlete';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {EditAthleteDialogComponent} from '../edit-athlete-dialog/edit-athlete-dialog.component';

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

  editAthlete(athlete: Athlete): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "400px";

    dialogConfig.data = athlete;

    this.dialog.open(EditAthleteDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
          this.athleteEdited.emit();
        }
      });
  }
}

