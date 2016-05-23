import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
@Component({
  moduleId: module.id,
  selector: 'flashcard-execution',
  templateUrl: 'flashcard-execution.component.html',
  styleUrls: ['flashcard-execution.component.css']
})
export class FlashcardExecutionComponent implements OnInit, OnChanges {


  @Input()
  exercise;

  flashcardGroups = [];


  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(event) {
    this.exercise = event.exercise.currentValue;
    this.updateFlashcards();
  }

  updateFlashcards():void {

    this.flashcardGroups.length = 0;

    _.forEach(this.exercise.flashcardGroups, (group) => {
      var randomFlashCard = group.flashcards[Math.floor(Math.random() * group.flashcards.length)];
      this.flashcardGroups.push(randomFlashCard);
    });
  }
}
