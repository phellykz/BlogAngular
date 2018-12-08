import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RouteGuard } from './auth/route-guard';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "AllPosts", component: AllPostsComponent, canActivate: [RouteGuard]},
  {path: "posts", component: MyPostsComponent, canActivate: [RouteGuard]},
  {path: "signup", component: SignUpComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
