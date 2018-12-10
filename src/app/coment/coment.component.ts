import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DaoServiceService } from '../service/dao-service.service';
import { UserService } from '../shared/user.service';
import { ENTITIES } from '../util/ENTITIES';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.css']
})
export class ComentComponent implements OnInit {
  
  idPost: string;
  name: string = '';
  user = firebase.auth().currentUser;

  constructor(private userService: UserService, private router: ActivatedRoute, private dao: DaoServiceService) {
    this.router.params.subscribe(
      params => {
        this.idPost = params['key'];
      }
    );
  }

  ngOnInit() {
    this.name = this.userService.getProfile().name;
  }

  coment(form) {
    var comentData = {
      idPost: this.idPost,
      body: form.value.body,
      date: new Date().toDateString(),
      author: this.name
    }

    this.dao.insert<Object>('coments', comentData);

  }  
}
