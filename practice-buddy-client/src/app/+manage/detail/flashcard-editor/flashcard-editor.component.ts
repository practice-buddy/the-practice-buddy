import { Component, OnInit, Input } from '@angular/core';
import {Exercise} from "../../../model/exercise";
import {FlashcardExercise} from "../../../model/flashcard-exercise";
import {FlashcardGroup} from "../../../model/flashcard-group";
import * as _ from 'lodash';
@Component({
  moduleId: module.id,
  selector: 'flashcard-editor',
  templateUrl: 'flashcard-editor.component.html',
  styleUrls: ['flashcard-editor.component.css']
})
export class FlashcardEditorComponent implements OnInit {

  @Input() exercise:FlashcardExercise;

  constructor() {
  }

  ngOnInit() {
  }

  addFlashcardGroup():void {
    this.exercise.flashcardGroups.push(new FlashcardGroup());
  }

  removeFlashcardGroup(flashcardGroup):void {
    this.exercise.flashcardGroups.splice(_.indexOf(this.exercise.flashcardGroups, flashcardGroup), 1);
  }

  addFlashcard(flashcardGroup, inputField) {
    if (inputField.value) {
      flashcardGroup.flashcards.push(inputField.value);
      inputField.value = '';
    }

  }
}
