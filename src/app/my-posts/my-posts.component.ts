import { ENTITIES } from './../util/ENTITIES';
import { Post } from '../entity/Post';
import { DaoServiceService } from './../service/dao-service.service';
import { NotificationService } from './../shared/notification.service';
import { MyFireService } from './../shared/myFireService';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

// import {AccordionModule} from 'primeng/accordion';
// import {MenuItem} from 'primeng/api';
// import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})

export class MyPostsComponent implements OnInit {

  constructor(private myFire: MyFireService, private notifier: NotificationService, private dao: DaoServiceService) { }

  ngOnInit() {

  }

  // onFileSelection(event){
  //   const fileList: FileList = event.target.files;
  //   if (fileList.length>0) {
  //     const file = fileList[0];
  //     this.myFire.uploadFile(file)
  //       .then(data=>{
  //         //TO DO
  //         this.notifier.display('sucess', 'Picture Successfully uploaded!');
  //         console.log(data['fileUrl']);
  //       })
  //       .catch(err=>{
  //         this.notifier.display('error', err.message);
  //       })
  //   }
  // }

  // post(form){
  //   var post = new Post();
  //   post.title = form.value.title;
  //   post.body = form.value.body;
  //   post.date = new Date();
  //   post.coments = [];
  //   post.autor = "EU MESMO"

  //   // this.dao.insert<Post>(ENTITIES.posts, post);

  //   this.dao.list(ENTITIES.posts).push(post);


  //   console.log(form.value.title);
  // }


  post(form) {

    var user = firebase.auth().currentUser;
    // A post entry.
    var postData = {
      author: user.displayName,
      body: form.value.body,
      title: form.value.title,
      date: new Date(),
      coments: []
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + user.uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);

    // form.value.title = "";
    // form.value.body = "";
  }

}
