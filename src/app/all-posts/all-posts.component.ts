import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ENTITIES } from '../util/ENTITIES';
import { map } from 'rxjs/operators';
import { DaoServiceService } from '../service/dao-service.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any;
  coments: any;

  constructor(private db: AngularFireDatabase, private dao: DaoServiceService) {
  //   this.db.list(ENTITIES.posts).snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(snapshot => ({ key: snapshot.payload.key, ...snapshot.payload.val() }))
  //     )
  //   ).subscribe(posts => { this.posts = posts, console.log(this.posts) });

    this.getKeyPosts();
    this.getKeyComents();

  }

  ngOnInit() {
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

}
