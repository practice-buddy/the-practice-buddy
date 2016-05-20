import {Component, OnInit, Input} from "@angular/core";
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

  executed():boolean{
    return  this.executedExercise === this.exercise;
  }

  constructor() {
  }

  ngOnInit() {
  }

  onClick(rating:number){
    this.executedExercise = this.exercise;
    if(rating === 0){
      window.alert("you're an idiot!");
    }else if(rating === 1){
      window.alert("try harder!");
    }else {
      window.alert("your practice buddy loves you!");
    }
  }

}
