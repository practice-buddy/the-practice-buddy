import {Component, OnInit, Input} from "@angular/core";
import {Exercise} from "../../../model/exercise";
import {ExercisesService} from "../../../services/exercices-service";

@Component({
  moduleId: module.id,
  selector: 'manage-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {

  editMode = false;

  @Input()
  exercise:Exercise;

  private errorMessage;

  constructor(private exercisesService:ExercisesService) {}

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.exercise);
    this.exercisesService.updateExercise(this.exercise).subscribe(
      error =>  this.errorMessage = <any>error);;
    this.editMode = false;
  }
}
