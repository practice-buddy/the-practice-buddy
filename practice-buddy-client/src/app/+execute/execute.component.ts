import { Component, OnInit } from '@angular/core';
import {Exercise} from "../model/exercise";
import {ExercisesService} from "../services/exercices-service";
import {ExecuteExerciseComponent} from "./execute-exercise/execute-exercise.component";
import {FocusListComponent} from "./focus-list/focus-list.component";

@Component({
  moduleId: module.id,
  selector: 'app-execute',
  templateUrl: 'execute.component.html',
  styleUrls: ['execute.component.css'],
  directives: [ExecuteExerciseComponent, FocusListComponent],
  providers: [ExercisesService]
})
export class ExecuteComponent implements OnInit {

  exercises:Exercise[];

  selectedExercise:Exercise;
  private errorMessage;
  
  constructor(private exercisesService:ExercisesService) {
  }

  onExerciseSelect(exercise:Exercise) {
    this.selectedExercise = exercise;
  }
  
  ngOnInit() {
    this.exercisesService.getExercise()
      .subscribe(
        exercises => this.exercises = exercises,
        error => this.errorMessage = <any>error);
  }
}
