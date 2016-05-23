import {ExerciseExecution} from "./exercise-execution";
export class Exercise {

  public _id;

  public executions:ExerciseExecution[] = [];
  public text:string;

  constructor(public title:string, public type: string) {
  };
}
