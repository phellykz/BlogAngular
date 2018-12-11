import { UpdatePostComponent } from './update-post/update-post.component';
import { ComentComponent } from './coment/coment.component';
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
  {path: "home", component: HomeComponent},
  {path: "allPosts", component: AllPostsComponent, canActivate: [RouteGuard]},
  {path: "myPosts", component: MyPostsComponent, canActivate: [RouteGuard]},
  {path: "updatePost", component: UpdatePostComponent, canActivate:[RouteGuard]},
  {path: "coment", component: ComentComponent, canActivate: [RouteGuard]},
  {path: "signup", component: SignUpComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "", redirectTo: "login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
