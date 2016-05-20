import { Component, OnInit } from '@angular/core';
import {DetailComponent} from "./detail/detail.component";
import {Exercise} from "../../model/exercise";
import {ExercisesService} from "../../services/exercices-service";
import {CreateNewExerciseComponent} from "./create-new-exercise/create-new-exercise.component";

@Component({
  moduleId: module.id,
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.css'],
  directives: [ DetailComponent, CreateNewExerciseComponent],
  providers: [ExercisesService]
})
export class ManageComponent implements OnInit {

  exercises:Exercise[];

  selectedExercise:Exercise;
  private errorMessage;

  constructor(private exercisesService:ExercisesService) {}

  onSelect(exercise:Exercise) {
    this.selectedExercise = exercise;
  }

  onExerciseCreated(){
    this.loadExercises();
  }

  ngOnInit() {
    this.loadExercises();
  }

  private loadExercises(){
      this.exercisesService.getExercise()
        .subscribe(
          exercises => this.exercises = exercises,
          error =>  this.errorMessage = <any>error);
      }

}
