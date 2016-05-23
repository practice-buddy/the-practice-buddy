import {ExerciseExecution} from "./exercise-execution";
export class Exercise {

  public _id;
  public type;

  constructor(public title:string,
              public executions:ExerciseExecution[],
              public text? :string) {
  };
}
