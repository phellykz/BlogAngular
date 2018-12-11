import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ENTITIES } from '../util/ENTITIES';
import { map } from 'rxjs/operators';
import { DaoServiceService } from '../service/dao-service.service';
import * as firebase from 'firebase';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any;
  coments: any;
  name: string = '';
  user = firebase.auth().currentUser;

  constructor(private userService: UserService, private db: AngularFireDatabase, private dao: DaoServiceService, private router: Router) {
    this.getKeyPosts();
    this.getKeyComents();

  }

  ngOnInit() {
    this.name = this.userService.getProfile().name;
  }

  post(form) {
    this.posts = [];

    var postData = {
      uid: this.user.uid,
      author: this.name,
      body: form.value.body,
      title: form.value.title,
      date: new Date().toDateString(),
      coments: [],
    };

    this.dao.insert<Object>('posts', postData);
  }

  getKeyPosts() {
    this.dao.list(ENTITIES.posts).snapshotChanges().pipe(
      map(changes =>
        changes.map(snapshot => ({ key: snapshot.payload.key, ...snapshot.payload.val() }))))
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  getKeyComents() {
    this.dao.list(ENTITIES.coments).snapshotChanges().pipe(
      map(changes =>
        changes.map(snapshot => ({ key: snapshot.payload.key, ...snapshot.payload.val() }))))
      .subscribe(coments => {
        this.coments = coments/*, this.getComents()*/, console.log(this.coments);
      });
  }

  del(post) {
    this.dao.remove<Object>('posts', post);
  }

  coment(p) {
    this.router.navigate(['coment', { key: p }]);
  } 

  delComent(coment) {
    this.dao.remove<Object>('coments', coment);
  }
}
