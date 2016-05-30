import { Component, OnInit, OnChanges, EventEmitter, Output, Input } from '@angular/core';
import {Exercise} from "../../../model/exercise";
import {ExercisesService} from "../../../services/exercises-service";
import {ExerciseType} from "../../../model/exercise-type";
import {FlashcardEditorComponent} from "../flashcard-editor/flashcard-editor.component";
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import * as _ from 'lodash';
import {ExerciseAttachment} from "../../../model/exerciseAttachments";
import {AttachmentViewComponent} from "../../../shared/attachment-view/attachment-view.component";
import {LabelEditorComponent} from "../../../shared/label-editor/label-editor.component";

@Component({
  moduleId: module.id,
  selector: 'exercise-editor',
  templateUrl: 'exercise-editor.component.html',
  directives: [FlashcardEditorComponent, FILE_UPLOAD_DIRECTIVES, AttachmentViewComponent, LabelEditorComponent],

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
    this.uploader.onCompleteAll = () => {
      this.exercisesService.getExercise(this.exercise._id).subscribe((updatedExercise)=> {
        this.updateAttachments(updatedExercise);
        this.updateExercise();
      })
    };
  }


  ngOnChanges(event:any) {
    if (this.exercise) {
      this.uploader.setOptions({url: '/exercises/' + this.exercise._id + '/attachments'});
    } else {
      this.uploader.setOptions({});
    }
  }

  onSubmit() {
    if (this.uploader.getNotUploadedItems().length > 0) {
      this.uploader.uploadAll();
    } else {
      this.updateExercise();
    }
  }

  private updateAttachments(updatedExercise) {
    let originalAttachments = this.exercise.attachments.slice(0);
    this.exercise.attachments.length = 0;
    this.exercise.attachments.push(...updatedExercise.attachments);

    _.forEach(_.filter(originalAttachments, {deleted: true}), (originalAttachment) => {
      let correspondingAttachment = _.find(this.exercise.attachments, {_id: originalAttachment._id});
      if (correspondingAttachment) {
        correspondingAttachment.deleted = true;
      }
    });
  };


  private updateExercise() {
    this.exercisesService.updateExercise(this.exercise).subscribe(
      error => {
        this.errorMessage = <any>error;
        this.exerciseUpdated.emit(this.exercise)
      });


  };

  isFlashcardExercise() {
    return this.exercise.type === ExerciseType.FlashcardExercise;
  }


}
