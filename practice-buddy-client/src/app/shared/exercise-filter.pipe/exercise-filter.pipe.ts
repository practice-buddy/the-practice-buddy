import { Pipe, PipeTransform } from '@angular/core';
import {Exercise} from "../../model/exercise";
import * as _ from 'lodash';

@Pipe({
  name: 'exerciseFilter',
  pure: false,

})
export class ExerciseFilter implements PipeTransform {

  transform(items:Exercise[], searchExercise?:Exercise):any {
    if (searchExercise.labels.length > 0) {
      return _.filter(items, (exercise) => {
        return _.difference(searchExercise.labels, exercise.labels).length === 0
      });
    }
    return items;

  }

}
