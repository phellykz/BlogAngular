import { UserService } from './shared/user.service';
import { MyFireService } from './shared/myFireService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './auth/logout/logout.component';

import { RouteGuard } from './auth/route-guard';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './shared/notification.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FirebaseConfig } from 'src/environments/firebase.config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPostsComponent,
    MyPostsComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [RouteGuard, 
              NotificationService, 
              MyFireService,
              UserService
            ],
  bootstrap: [AppComponent]
})

export class AppModule { }
