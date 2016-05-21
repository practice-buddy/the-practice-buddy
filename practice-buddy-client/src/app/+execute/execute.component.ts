import {Component, OnInit} from "@angular/core";
import {Exercise} from "../model/exercise";
import {ExecuteExerciseComponent} from "./execute-exercise/execute-exercise.component";
import {FocusListComponent} from "./focus-list/focus-list.component";
import {PracticeFocusService} from "../services/practice-focus-service";
import {PracticeFocus} from "../model/practice-focus";
import {ExercisesService} from "../services/exercices-service";
import * as _ from "lodash";

@Component({
  moduleId: module.id,
  selector: 'app-execute',
  templateUrl: 'execute.component.html',
  styleUrls: ['execute.component.css'],
  directives: [ExecuteExerciseComponent, FocusListComponent],
  providers: [PracticeFocusService, ExercisesService]
})
export class ExecuteComponent implements OnInit {

  practiceFocus:PracticeFocus;

  selectedExercise:Exercise;

  private errorMessage;

  constructor(private practiceFoccusService:PracticeFocusService,
              private exerciseSerivce:ExercisesService) {
  }

  onExerciseSelect(exercise:Exercise) {
    this.selectedExercise = exercise;
  }

  onExerciseExecuted(rating:number) {
    this.exerciseSerivce.saveExecution(this.selectedExercise._id, rating)
      .subscribe(
        error => this.errorMessage = <any>error);

    this.loadPracticeFocus();
  }

  ngOnInit() {
    this.loadPracticeFocus();
  }

  private loadPracticeFocus() {
    this.practiceFoccusService.getExerciseFocus()
      .subscribe(
        practiceFocus => {
          this.practiceFocus = practiceFocus;

          if(this.selectedExercise) {
            this.selectedExercise = _.find(this.practiceFocus.exercises, {"_id": this.selectedExercise._id});
            console.log(this.selectedExercise);

          }
        },
        error => this.errorMessage = <any>error);
  }
}
