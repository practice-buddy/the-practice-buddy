import {Component, OnInit, EventEmitter, Output, Input} from "@angular/core";
import {Exercise} from "../../model/exercise";
import {Dragula, DragulaService} from "ng2-dragula/ng2-dragula";
import {PracticeFocusService} from "../../services/exercices-focus-service";
import {PracticeFocus} from "../../model/exerciseFocus";
import {ExercisesService} from "../../services/exercices-service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import * as _ from "lodash";
import {CreateNewExerciseComponent} from "./create-new-exercise/create-new-exercise.component";

@Component({
  moduleId: module.id,
  selector: 'manage-library-list',
  templateUrl: 'library-list.component.html',
  viewProviders: [DragulaService],
  directives: [CreateNewExerciseComponent, Dragula],
  providers: [PracticeFocusService],
  styleUrls: ['library-list.component.css']
})
export class LibraryListComponent implements OnInit {

  @Output('exerciseSelected') exerciseSelected = new EventEmitter<Exercise>();
  @Input() selectedExercise:Exercise;

  private practiceFocus:PracticeFocus;
  private practiceExercises:Exercise[] = [];
  private libraryExercises:Exercise[] = [];

  constructor(private dragulaService:DragulaService, private exercisesFocusService:PracticeFocusService, private exercisesService:ExercisesService) {
    this.fetchData();

    dragulaService.dropModel.subscribe(() => {
      this.practiceFocus.exercises = this.practiceExercises;
      this.exercisesFocusService.updateFocus(this.practiceFocus).subscribe(
        error => console.log(error));
    });
  }

  private fetchData() {
    Observable.forkJoin(
      this.exercisesService.getExercise(),
      this.exercisesFocusService.getExerciseFocus()
    ).subscribe(
      data => {
        let exercises = data[0];
        let practiceFocus = data[1];
        this.libraryExercises.length = 0;
        this.practiceExercises.length = 0;

        this.libraryExercises.push(...exercises);
        this.practiceExercises.push(...practiceFocus.exercises);

        this.practiceFocus = practiceFocus;
        _.forEach(this.practiceExercises, (each) => {
          _.remove(this.libraryExercises, {
            "_id": each._id
          })
          ;
        });
      },
      err => console.error(err)
    );
  }

  ngOnInit() {
  }

  onExerciseCreated() {
    this.fetchData();
  }

  onSelect(exercise:Exercise) {
    this.selectedExercise = exercise;
    this.exerciseSelected.emit(exercise);
  }


}
