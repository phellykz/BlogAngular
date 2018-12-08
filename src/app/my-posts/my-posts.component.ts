import { NotificationService } from './../shared/notification.service';
import { MyFireService } from './../shared/myFireService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(private myFire: MyFireService, private notifier: NotificationService) { }

  ngOnInit() {
  }

  onFileSelection(event){
    const fileList: FileList = event.target.files;
    if (fileList.length>0) {
      const file = fileList[0];
      this.myFire.uploadFile(file)
        .then(data=>{
          //TO DO
          this.notifier.display('sucess', 'Picture Successfully uploaded!');
          console.log(data['fileUrl']);
        })
        .catch(err=>{
          this.notifier.display('error', err.message);
        })
    }
  }

}
