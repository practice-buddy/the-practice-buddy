import { Component, OnInit, OnChanges, EventEmitter, Output, Input } from '@angular/core';
import {Exercise} from "../../../model/exercise";
import {ExercisesService} from "../../../services/exercises-service";
import {ExerciseType} from "../../../model/exercise-type";
import {FlashcardEditorComponent} from "../flashcard-editor/flashcard-editor.component";
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'exercise-editor',
  templateUrl: 'exercise-editor.component.html',
  directives: [FlashcardEditorComponent, FILE_UPLOAD_DIRECTIVES],

  styleUrls: ['exercise-editor.component.css']
})
export class ExerciseEditorComponent implements OnInit, OnChanges {

  @Input() exercise:Exercise;
  @Output('exerciseUpdated') exerciseUpdated = new EventEmitter<Exercise>();

  public uploader:FileUploader = new FileUploader({});

  private errorMessage;

  constructor(private exercisesService:ExercisesService) {
  }

  ngOnInit() {
  }


  ngOnChanges(event:any) {
    this.uploader.setOptions({url: '/exercises/' + this.exercise._id + '/attachments'})
  }

  onSubmit() {

    this.uploader.onCompleteAll = () => {
      this.exercisesService.getExercise(this.exercise._id).subscribe((updatedExercise)=> {
        this.exercise.attachments.length = 0;
        this.exercise.attachments.push(...updatedExercise.attachments);
        this.updateExercise();
      })
    };

    if (this.uploader.getNotUploadedItems().length > 0) {
      this.uploader.uploadAll();
    } else {
      this.updateExercise();
    }


  }

  private updateExercise() {
    this.exercisesService.updateExercise(this.exercise).subscribe(
      error => this.errorMessage = <any>error);
    this.exerciseUpdated.emit(this.exercise);
  };

  isFlashcardExercise() {
    return this.exercise.type === ExerciseType.FlashcardExercise;
  }


}
