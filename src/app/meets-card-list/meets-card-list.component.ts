import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meet } from '../models/meet';
import { MeetsService } from '../services/meets.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditMeetDialogComponent } from '../edit-meet-dialog/edit-meet-dialog.component';

@Component({
    selector: 'meets-card-list',
    templateUrl: './meets-card-list.component.html',
    styleUrls: ['./meets-card-list.component.scss'],
})
export class MeetsCardListComponent implements OnInit {
    @Input()
    meets: Meet[] | undefined;

    @Output()
    meetEdited = new EventEmitter();

    @Output()
    meetDeleted = new EventEmitter<Meet>();

    constructor(private dialog: MatDialog, private router: Router, private meetsService: MeetsService) {}

    ngOnInit(): void {}

    editMeet(meet: Meet): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = '400px';
        dialogConfig.data = meet;

        this.dialog
            .open(EditMeetDialogComponent, dialogConfig)
            .afterClosed()
            .subscribe((val) => {
                if (val) {
                    this.meetEdited.emit();
                }
            });
    }
}
