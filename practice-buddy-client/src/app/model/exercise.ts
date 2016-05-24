import {ExerciseExecution} from "./exercise-execution";
import {ExerciseType} from "./exercise-type";
export class Exercise {

  public _id;

  public executions:ExerciseExecution[] = [];
  public text:string;

  public type:string = ExerciseType.SimpleExercise;

  constructor(public title:string) {
  };
}
