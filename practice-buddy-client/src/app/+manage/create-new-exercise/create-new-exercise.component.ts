import { Component, OnInit } from '@angular/core';
import {Exercise} from "../../../model/exercise";

@Component({
  moduleId: module.id,
  selector: 'create-new-exercise',
  templateUrl: 'create-new-exercise.component.html',
  styleUrls: ['create-new-exercise.component.css']
})
export class CreateNewExerciseComponent implements OnInit {

  newExercise:Exercise;

  constructor() {}

  ngOnInit() {
    this.newExercise = new Exercise('');
  }

}
