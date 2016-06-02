import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Exercise} from "../../model/exercise";
import {ExerciseAttachment} from "../../model/exerciseAttachments";
import * as _ from 'lodash';
import {AudioPlayerComponent} from "../audio-player/audio-player.component";
import {ExercisesService} from "../../services/exercises-service";


const SUPPORTED_AUDIO_FORMATS = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/x-wav', 'audio/x-m4a', 'audio/mp4', 'audio/mp4', 'audio/aac', 'audio/mp3'];


@Component({
  moduleId: module.id,
  selector: 'attachment-view',
  templateUrl: 'attachment-view.component.html',
  styleUrls: ['attachment-view.component.css'],
  directives: [AudioPlayerComponent]
})
export class AttachmentViewComponent implements OnInit, OnChanges {

  @Input()
  private exercise:Exercise;

  private audioFiles:ExerciseAttachment[] = [];
  private otherAttachments:ExerciseAttachment[] = [];

  ngOnInit() {
  }

  ngOnChanges(changes):void {
    if (changes['exercise']) {
      this.audioFiles.length = 0;
      this.otherAttachments.length = 0;
      this.audioFiles = _.filter(this.exercise.attachments, this.isAudioFile);
      this.otherAttachments = _.reject(this.exercise.attachments, this.isAudioFile);
    }
  }

  isAudioFile(attachment:ExerciseAttachment):boolean {
    if (attachment) {
      return _.includes(SUPPORTED_AUDIO_FORMATS, attachment.mimetype);
    }
    return false;
  }
}
