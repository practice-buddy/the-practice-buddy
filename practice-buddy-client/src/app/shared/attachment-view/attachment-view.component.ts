import { Component, OnInit, Input } from '@angular/core';
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
export class AttachmentViewComponent implements OnInit {

  @Input()
  private exercise:Exercise;

  @Input()
  private editMode: boolean;

  constructor(private exercisesService: ExercisesService) {
  }

  ngOnInit() {
  }


  isAudioFile(attachment:ExerciseAttachment):boolean {
    if (attachment) {
      return _.includes(SUPPORTED_AUDIO_FORMATS, attachment.mimetype);
    }
    return false;
  }

  getStreamingUrl(audiofile:ExerciseAttachment) {
    return '/attachments/' + audiofile.content;
  }

  getAttachmentTitle(attachment:ExerciseAttachment) {
    return attachment.name.substr(0, attachment.name.lastIndexOf('.')) || attachment.name;
  }

  deleteAttachment(attachment:ExerciseAttachment) {
    attachment.deleted = true;
  }

}
