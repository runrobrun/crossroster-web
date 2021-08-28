import { Component, OnInit } from '@angular/core';
import {Athlete} from '../models/athlete';
import {ActivatedRoute} from '@angular/router';
import {AthletesService} from '../services/athletes.service';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss']
})
export class AthleteComponent implements OnInit {

  athlete: Athlete;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private athletesService: AthletesService) { }

  ngOnInit(): void {
    this.athlete = this.route.snapshot.data.athlete;
    console.log("Athlete: ", this.athlete);
  }

}
