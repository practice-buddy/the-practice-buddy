import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import {ExerciseAttachment} from "../../model/exerciseAttachments";

const SUPPORTED_AUDIO_FORMATS = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/x-wav', 'audio/x-m4a', 'audio/mp4', 'audio/mp4', 'audio/aac', 'audio/mp3'];

@Pipe({
  name: 'fileFilter'
})
export class FileFilter implements PipeTransform {

  transform(value:ExerciseAttachment[], fileType:string):any {
    if (fileType === FileType.Audio) {
      return _.filter(value, this.isAudioFile);
    }
    return _.reject(value, this.isAudioFile);
  }

  isAudioFile(attachment:ExerciseAttachment):boolean {
    if (attachment) {
      return _.includes(SUPPORTED_AUDIO_FORMATS, attachment.mimetype);
    }
    return false;
  }

}

export let FileType = {
  Audio: 'Audio',
  Others: 'Others'
}


