import { Router } from '@angular/router';
import { ENTITIES } from './../util/ENTITIES';
import { DaoServiceService } from './../service/dao-service.service';
import { NotificationService } from './../shared/notification.service';
import { MyFireService } from './../shared/myFireService';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { UserService } from '../shared/user.service';

// import {AccordionModule} from 'primeng/accordion';
// import {MenuItem} from 'primeng/api';
// import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})

export class MyPostsComponent implements OnInit {
  posts: any;
  coments: any;
  myPosts: Array<any> = [];
  name: string = '';
  user = firebase.auth().currentUser;

  constructor( private userService: UserService, private myFire: MyFireService, private notifier: NotificationService,
    private db: AngularFireDatabase, private dao: DaoServiceService, private router: Router) {

    this.getKeyPosts();
    this.getKeyComents();
  }

  ngOnInit() {
    this.name = this.userService.getProfile().name;
  }

  post(form) {
    this.myPosts = [];

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

  getMyPosts() {
    for (var i = 0; i < this.posts.length; i++) {
      if (this.posts[i].uid == this.user.uid) {
        this.myPosts.push(this.posts[i]);
      }
    }
  }

  getKeyPosts() {
    this.dao.list(ENTITIES.posts).snapshotChanges().pipe(
      map(changes =>
        changes.map(snapshot => ({ key: snapshot.payload.key, ...snapshot.payload.val() }))))
      .subscribe(posts => {
        this.posts = posts, this.getMyPosts();
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
    this.myPosts = [];
    this.dao.remove<Object>('posts', post);
    // this.router.navigate(['allPosts']);
  }

  delComent(coment) {
    this.coments = [];
    this.dao.remove<Object>('coments', coment);
  }

  coment(p) {
    this.router.navigate(['coment', { key: p }]);
  }

  updatePost(p) {
    this.router.navigate(['updatePost', {key: p.key, author: p.author, body: p.body, date: p.date, title: p.title, uid: p.uid }]);
  }

}
