import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {User} from  "../model/user";
import {UserService} from "../services/user-service";


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],

})
export class LoginComponent implements OnInit {

  private user:User;

  login(name:string) {
    this.userService.setUser(this.user).subscribe(() => {
      this.router.navigate(['/manage']);
    }, error => {
      console.log(error);
    })

  }


  constructor(private userService:UserService, private router:Router) {
  }

  ngOnInit() {
    this.user = new User();
  }

}
