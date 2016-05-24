import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {Exercise} from "../../../model/exercise";
import {ExerciseType} from "../../../model/exercise-type";
import {ExercisesService} from "../../../services/exercises-service";

@Component({
  moduleId: module.id,
  selector: 'create-new-exercise',
  templateUrl: 'create-new-exercise.component.html',
  styleUrls: ['create-new-exercise.component.css']
})
export class CreateNewExerciseComponent implements OnInit {

  @Output('exerciseCreated') exerciseCreated = new EventEmitter();

  newExercise:Exercise;

  errorMessage:string;

  types:string[] = Object.keys(ExerciseType);

  constructor(private exercisesService:ExercisesService) {
  }

  ngOnInit() {
    this.newExercise = new Exercise('');
  }

  onSubmit() {
    this.exercisesService.createExercise(this.newExercise).subscribe(
      error => this.errorMessage = <any>error);
    this.ngOnInit();
    this.exerciseCreated.emit(null);
  }

}
