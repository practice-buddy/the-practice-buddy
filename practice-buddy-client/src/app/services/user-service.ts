
import {Injectable} from "@angular/core";
import {User} from "../model/user";

@Injectable()
export class UserService {
  private user:User;

  setUser(user:User) {

    this.user=user;
    if (!this.user) throw new Error('whut')
  }

  getUser():User {
    return this.user;
  }
}
