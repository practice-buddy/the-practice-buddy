import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {User} from "../model/user";
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class UserService {
  private user:User;
  private authUrl = '/auth';


  constructor(private http:Http) {
  }

  setUser(user:User): Observable<User> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = this.authUrl + "/login";
    return this.http.post(url, body, options)
      .catch(this.handleError);

  }

  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getUser():User {
    return this.user;
  }
}
