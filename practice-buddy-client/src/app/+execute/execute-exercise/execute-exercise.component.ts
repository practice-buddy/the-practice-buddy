import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Exercise} from "../../model/exercise";

@Component({
  moduleId: module.id,
  selector: 'execute-exercise',
  templateUrl: 'execute-exercise.component.html',
  styleUrls: ['execute-exercise.component.css']
})
export class ExecuteExerciseComponent implements OnInit {

  @Input() exercise:Exercise;
  @Input() executed:boolean;

  @Output('exerciseExecuted') exerciseExecuted = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(rating:number) {
    this.exerciseExecuted.emit(rating);
  }

}
