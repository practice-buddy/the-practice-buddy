import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Exercise} from "../model/exercise";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExercisesService {

  constructor(private http:Http) {
  }

  private exercisesUrl = 'exercises';
  private simpleExercisesUrl =  this.exercisesUrl + '/simpleExercises';

  getExercise():Observable<Exercise[]> {
    return this.http.get(this.exercisesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateExercise (exercise: Exercise): Observable<Exercise> {
    let body = JSON.stringify(exercise);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.simpleExercisesUrl, body, options)
      .catch(this.handleError);
  }

  createExercise(exercise: Exercise): Observable<Exercise>{
    let body = JSON.stringify(exercise);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.simpleExercisesUrl, body, options)
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
