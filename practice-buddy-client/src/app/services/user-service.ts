import {Injectable} from "@angular/core";
import {User} from "../model/user";

@Injectable()
export class UserService {
  private user:User;

  setUser(user:User) {
    console.log("setUser "+ user.name);

    this.user=user;
    if (!this.user) throw new Error('whut')
  }

  getUser():User {
    console.log("getUser "+ this.user);
    return this.user;
  }
}
