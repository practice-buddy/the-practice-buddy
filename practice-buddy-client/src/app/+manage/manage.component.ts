import { Component, OnInit } from '@angular/core';
import {DetailComponent} from "./detail/detail.component";
import {Exercise} from "../../model/exercise";
import {ExercisesService} from "../../services/exercices-service";

@Component({
  moduleId: module.id,
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.css'],
  directives: [ DetailComponent],
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

  ngOnInit() {
    this.exercisesService.getExercise()
      .subscribe(
        exercises => this.exercises = exercises,
        error =>  this.errorMessage = <any>error);
  }

}
