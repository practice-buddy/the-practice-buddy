import {Component, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import {ExecuteComponent} from './+execute';
import {ManageComponent} from './+manage';
import {LoginComponent} from './+login';
import {UserService} from "./services/user-service";
import {User} from "./model/user";


@Component({
  moduleId: module.id,
  selector: 'practice-buddy-client-app',
  templateUrl: 'practice-buddy-client.component.html',
  styleUrls: ['practice-buddy-client.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, UserService]
})
@Routes([
  {path: '/execute', component: ExecuteComponent},
  {path: '/manage', component: ManageComponent},
  {path: '/login', component: LoginComponent}

])
export class PracticeBuddyClientAppComponent implements OnInit {
  title = 'practice-buddy-client works!';

  loggedin():User {
    console.log("loggin. User : "+this.userService.getUser());
    return this.userService.getUser();
  }

  ngOnInit() {
  }


  constructor(private router:Router, private userService:UserService) {
    if (this.userService.getUser() == null) {
      console.log("redirect to login page from constructor");
      this.router.navigate(['/login']);
    }
  }
}
