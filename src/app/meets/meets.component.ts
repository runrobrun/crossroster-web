import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meet } from '../models/meet';
import { AngularFirestore } from '@angular/fire/firestore';
import { MeetsService } from '../services/meets.service';

@Component({
    selector: 'app-meets',
    templateUrl: './meets.component.html',
    styleUrls: ['./meets.component.scss'],
})
export class MeetsComponent implements OnInit {
    activeMeets$: Observable<Meet[]>;
    archivedMeets$: Observable<Meet[]>;
    selectedSeason: number;

    constructor(private db: AngularFirestore, private meetsService: MeetsService) {}

    ngOnInit(): void {
        this.reloadMeets();
    }

    reloadMeets(): void {
        this.activeMeets$ = this.meetsService.loadMeets(false);
        this.archivedMeets$ = this.meetsService.loadMeets(true);
    }
}
