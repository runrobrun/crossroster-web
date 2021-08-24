import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  onReadDoc() {
    this.db.doc("/athletes/L7eZ8TW3MsjPUjzbwuIE").get()
      .subscribe(snap => {
        console.log(snap.id);
        console.log(snap.data());
      })
  }
}
