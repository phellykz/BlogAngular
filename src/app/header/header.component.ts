import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../shared/user.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  name: string;
  uid: string;
  email: string;

  constructor( private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.statusChange.subscribe(userData =>{
      if (userData && userData.name) {
        this.name = userData.name;
        this.email = userData.email;
        this.uid = userData.uid;        
      }
      else{
        this.name = null;
        this.email = null;
        this.uid = null; 
      }
    });

    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified){
        const user =  this.userService.getProfile();
        if (user && user.name) {
          this.name = user.name;
          this.email = user.email;
          this.uid = user.uid;
        }
        this.isLoggedIn = true;
        this.router.navigate(["myPosts"]);
      }
      else {
        this.isLoggedIn = false;
        firebase.auth().signOut();
      }
    });

  }

  onLogout(){
    firebase.auth().signOut()
    .then(()=>{
      this.userService.destroy();
      this.isLoggedIn = false;
      this.router.navigate([""]);     
    })
  }

}
