import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {Exercise} from "../../model/exercise";
import {ExercisesService} from "../../services/exercices-service";

@Component({
  moduleId: module.id,
  selector: 'create-new-exercise',
  templateUrl: 'create-new-exercise.component.html',
  styleUrls: ['create-new-exercise.component.css']
})
export class CreateNewExerciseComponent implements OnInit {

  @Output('exerciseCreated') exerciseCreated = new EventEmitter();

  newExercise:Exercise;

  private errorMessage;

  constructor(private exercisesService:ExercisesService) {
  }

  ngOnInit() {
    this.newExercise = new Exercise('');
  }

  onSubmit() {
    console.log(this.newExercise);
    this.exercisesService.createExercise(this.newExercise).subscribe(
      error => this.errorMessage = <any>error);
    this.newExercise = new Exercise('');
    this.exerciseCreated.emit(null);
  }

}
