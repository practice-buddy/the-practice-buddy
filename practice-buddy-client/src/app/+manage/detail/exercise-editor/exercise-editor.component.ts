import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {Exercise} from "../../../model/exercise";
import {ExercisesService} from "../../../services/exercises-service";

@Component({
  moduleId: module.id,
  selector: 'exercise-editor',
  templateUrl: 'exercise-editor.component.html',
  styleUrls: ['exercise-editor.component.css']
})
export class ExerciseEditorComponent implements OnInit {

  @Input() exercise:Exercise;
  @Output('exerciseUpdated') exerciseUpdated = new EventEmitter<Exercise>();

  private errorMessage;


  constructor(private exercisesService:ExercisesService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.exercisesService.updateExercise(this.exercise).subscribe(
      error => this.errorMessage = <any>error);
    this.exerciseUpdated.emit(this.exercise);
  }

}
