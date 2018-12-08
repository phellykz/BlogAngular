import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


import { UserService } from './../../shared/user.service';
import { MyFireService } from './../../shared/myFireService';
import { NotificationService } from './../../shared/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(  private notifier: NotificationService, 
                private myFire: MyFireService,
                private userService: UserService,
                private router: Router  
              ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm){

    const email = f.value.email;
    const password = f.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userData => {
      if (userData.user.emailVerified) {
        return this.myFire.getUserFromDatabase(userData.user.uid);
      } else {
        const message = "Seu email ainda não foi confirmado!"
        this.notifier.display('error', message);
        firebase.auth().signOut();
      }
    })
    .then(userDataFromDatabase => {
      if (userDataFromDatabase) {
          this.userService.set(userDataFromDatabase);
          this.router.navigate(['/allpost'])
          console.log(userDataFromDatabase);
      }
    })
    .catch(err =>{
      this.notifier.display('error', err.message);
    });

  }

}
