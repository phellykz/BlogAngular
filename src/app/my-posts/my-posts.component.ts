import { ENTITIES } from './../util/ENTITIES';
import { Post } from '../entity/Post';
import { DaoServiceService } from './../service/dao-service.service';
import { NotificationService } from './../shared/notification.service';
import { MyFireService } from './../shared/myFireService';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

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
  myPosts: Array<any> = [];
  user = firebase.auth().currentUser;

  constructor(private myFire: MyFireService, private notifier: NotificationService,
    private db: AngularFireDatabase, private dao: DaoServiceService) {

    this.db.list(ENTITIES.posts).snapshotChanges().pipe(
      map(changes =>
        changes.map(snapshot => ({ key: snapshot.payload.key, ...snapshot.payload.val() }))))
      .subscribe(posts => {
        this.posts = posts, this.getMyPosts();
      });
  }

  ngOnInit() {

  }

  getMyPosts() {
    for (var i = 0; i < this.posts.length; i++) {
      if (this.posts[i].author == this.user.uid) {
        this.myPosts.push(this.posts[i]);
      }
    }
  }

  post(form) {
    this.myPosts = [];

    var postData = {
      author: this.user.uid,
      body: form.value.body,
      title: form.value.title,
      date: new Date(),
      coments: [],
    };

    this.dao.insert<Object>('posts', postData);
  }

  del(post) {
    this.myPosts = [];
    this.dao.remove<Object>('posts', post);
  }

}
