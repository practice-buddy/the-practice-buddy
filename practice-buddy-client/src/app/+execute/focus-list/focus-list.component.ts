import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Exercise} from "../../model/exercise";

@Component({
  moduleId: module.id,
  selector: 'execute-focus-list',
  templateUrl: 'focus-list.component.html',
  styleUrls: ['focus-list.component.css']
})
export class FocusListComponent implements OnInit {

  @Input() exercises:Exercise[];
  @Input() selectedExercise:Exercise;

  @Output('exerciseSelected') exerciseSelected = new EventEmitter<Exercise>();

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(exercise:Exercise) {
    this.exerciseSelected.emit(exercise);
  }


}
