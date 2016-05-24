import {Component, OnInit, Input} from "@angular/core";
import {Exercise} from "../../model/exercise";
import {ExercisesService} from "../../services/exercices-service";
import {ExerciseViewComponent} from "../../shared/exercise-view/exercise-view.component";

@Component({
  moduleId: module.id,
  selector: 'manage-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css'],
  directives: [ExerciseViewComponent]
})
export class DetailComponent implements OnInit {

  editMode = false;

  @Input() exercise:Exercise;

  private errorMessage;

  constructor(private exercisesService:ExercisesService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.exercise);
    this.exercisesService.updateExercise(this.exercise).subscribe(
      error => this.errorMessage = <any>error);
    this.editMode = false;
  }
}
