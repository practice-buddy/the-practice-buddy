import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import {Exercise} from "../../../model/exercise";
import {FlashcardExercise} from "../../../model/flashcard-exercise";

@Component({
  moduleId: module.id,
  selector: 'flashcard-execution',
  templateUrl: 'flashcard-execution.component.html',
  styleUrls: ['flashcard-execution.component.css']
})
export class FlashcardExecutionComponent implements OnInit, OnChanges {

  @Input()
  exercise:FlashcardExercise;

  flashcardGroups:string[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(event:any) {
    this.exercise = event.exercise.currentValue;
    this.updateFlashcards();
  }

  updateFlashcards():void {

    this.flashcardGroups.length = 0;

    _.forEach(this.exercise.flashcardGroups, (group) => {
      let randomFlashCard = group.flashcards[Math.floor(Math.random() * group.flashcards.length)];
      this.flashcardGroups.push(randomFlashCard);
    });
  }
}
