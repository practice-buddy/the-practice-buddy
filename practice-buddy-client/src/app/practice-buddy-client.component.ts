import {Component, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import { Location } from '@angular/common';

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

  private isLoggedIn;


  logout() {
    this.userService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    },(err) => {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
    this.router.changes.subscribe((val) => {
      if(location.pathname !== '/login') {
        this.userService.getUser().subscribe((user) => {
          this.isLoggedIn = true;
        }, error => {
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
        });

      } else {
        this.isLoggedIn =false;
      }
    })
  }

  constructor(private router:Router, private userService:UserService, private location:Location) {

  }
}
