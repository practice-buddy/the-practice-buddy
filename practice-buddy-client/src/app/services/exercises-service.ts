import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Exercise} from "../model/exercise";
import {ExerciseType} from "../model/exercise-type";
import {ExerciseAttachment} from "../model/exerciseAttachments";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ExercisesService {

  private exercisesUrl = 'exercises';
  private simpleExercisesUrl = this.exercisesUrl + '/simpleExercises';
  private flashcardExercisesUrl = this.exercisesUrl + '/flashcardExercises';
  private attachmentUrl = 'attachments';

  private typeToUrlMap:Map<string, string> = new Map<string, string>();

  constructor(private http:Http) {
    this.typeToUrlMap.set(ExerciseType.FlashcardExercise, this.flashcardExercisesUrl);
    this.typeToUrlMap.set(ExerciseType.SimpleExercise, this.simpleExercisesUrl);
  }

  getExercise(id:number):Observable<Exercise> {
    return this.http.get(this.exercisesUrl + "/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getExercises():Observable<Exercise[]> {
    return this.http.get(this.exercisesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateExercise(exercise:Exercise):Observable<Exercise> {
    let body = JSON.stringify(exercise);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.getUrlForExerciseType(exercise), body, options)
      .catch(this.handleError);
  }

  private getUrlForExerciseType(exercise:Exercise) {
    let url = this.typeToUrlMap.get(exercise.type);
    if (!url) throw new Error('Unknown Exercise Type');
    return url;
  };

  createExercise(exercise:Exercise):Observable<Exercise> {
    let body = JSON.stringify(exercise);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.getUrlForExerciseType(exercise), body, options)
      .catch(this.handleError);
  }

  saveExecution(id:any, rating:number) {
    let body = JSON.stringify({personalPerformanceRating: rating});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = this.exercisesUrl + "/" + id + "/execution";

    return this.http.post(url, body, options)
      .catch(this.handleError);
  }

  getLabels():Observable<string[]> {
    return this.http.get(this.exercisesUrl + '/labels')
      .map(this.extractData)
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
