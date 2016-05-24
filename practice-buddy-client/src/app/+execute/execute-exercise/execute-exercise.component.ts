import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Exercise} from "../../model/exercise";
import {ExerciseType} from "../../model/exercise-type";
import {FlashcardExecutionComponent} from "./flashcard-execution/flashcard-execution.component";
import {MarkdownViewComponent} from "../../shared/markdown-view/markdown-view.component";
import {ExerciseViewComponent} from "../../shared/exercise-view/exercise-view.component";

@Component({
  moduleId: module.id,
  selector: 'execute-exercise',
  templateUrl: 'execute-exercise.component.html',
  styleUrls: ['execute-exercise.component.css'],
  directives: [ExerciseViewComponent, FlashcardExecutionComponent]
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

  isFlashcardExercise() {
    return this.exercise.type === ExerciseType.FlashcardExercise;
  }

}
