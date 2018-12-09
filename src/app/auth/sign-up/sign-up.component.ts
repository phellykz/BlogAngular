import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as firebase from 'firebase';
import { NotificationService } from 'src/app/shared/notification.service';
import { User } from 'src/app/entity/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private notifier: NotificationService) {  }

  ngOnInit() {
  }

  onSubmit(f:NgForm){

    const fullName = f.value.fullName;
    const email = f.value.email;
    const password = f.value.password;

    var user = new User();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( userData => {
        userData.user.sendEmailVerification();
        const message = "Cadastro realizado com sucesso, por favor acesse seu email para confirmar a verificação"
        this.notifier.display('success', message);
        return firebase.database().ref( 'users/' + userData.user.uid ).set({
          email: email,
          uid: userData.user.uid,
          registrationDate: new Date().toString(),
          name: fullName
        });
      })
      .catch(err => {
        this.notifier.display('error', err.message);
        console.log(err);
      });

  }
}
