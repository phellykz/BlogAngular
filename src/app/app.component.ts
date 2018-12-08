import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(){
    const config = {
      apiKey: "AIzaSyCQtph20r3jejDopK-QEy4AcMmV-eee0B4",
      authDomain: "myinsta-24608.firebaseapp.com",
      databaseURL: "https://myinsta-24608.firebaseio.com",
      projectId: "myinsta-24608",
      storageBucket: "myinsta-24608.appspot.com",
      messagingSenderId: "977712781060"
    };
    firebase.initializeApp(config);
  }

}
