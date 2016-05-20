import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";
import {PracticeFocus} from "../model/exerciseFocus";

@Injectable()
export class PracticeFocusService {

  constructor(private http:Http) {
  }

  private practiceFocusUrl = 'practiceFocus';

  getExerciseFocus():Observable<PracticeFocus> {
    return this.http.get(this.practiceFocusUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateFocus (exercise: PracticeFocus): Observable<PracticeFocus> {
    let body = JSON.stringify(exercise);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.practiceFocusUrl, body, options)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    return res.json();
  }

  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
