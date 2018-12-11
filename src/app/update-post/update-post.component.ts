import { ENTITIES } from './../util/ENTITIES';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DaoServiceService } from '../service/dao-service.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  idPost: string;
  author:string;
  body:string;
  date:string;
  title:string;
  uid:string;
  post: any;

  constructor(private userService: UserService, 
    private router: ActivatedRoute,
    private dao: DaoServiceService,
    private route: Router) {
    this.router.params.subscribe(
      params => {
        this.idPost = params['key'];
        this.author = params['author'];
        this.body = params['body'];
        this.date = params['date'];
        this.title = params['title']
        this.uid = params['uid'];
      }
    );
    console.log(this.body);
  }

  ngOnInit() {
  }

  updatePost(f){
    var newPost = {
      author: this.author,
      body: f.value.body,
      date: new Date().toDateString(),
      title: f.value.title,
      uid: this.uid
    }

    this.dao.update<Object>(ENTITIES.posts, this.idPost,newPost);
    this.route.navigate(['allPosts']);
  }

}
