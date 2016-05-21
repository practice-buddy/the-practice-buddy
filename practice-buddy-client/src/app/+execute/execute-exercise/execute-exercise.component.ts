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
  executedExercise:Exercise;
  lastResult:string;

  @Output('exerciseExecuted') exerciseExecuted = new EventEmitter<number>();

  executed():boolean {
    return this.executedExercise === this.exercise;
  }

  constructor() {
  }

  ngOnInit() {
  }

  onClick(rating:number) {

    this.exerciseExecuted.emit(rating);
    if (rating === 0) {
      this.lastResult = "you're an idiot!";
    } else if (rating === 1) {
      this.lastResult = "try harder!";
    } else {
      this.lastResult = "your practice buddy loves you!";
    }
  }

}
