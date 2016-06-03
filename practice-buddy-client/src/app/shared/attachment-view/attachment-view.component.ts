import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Exercise} from "../../model/exercise";
import {ExerciseAttachment} from "../../model/exerciseAttachments";
import * as _ from 'lodash';
import {AudioPlayerComponent} from "../audio-player/audio-player.component";
import {ExercisesService} from "../../services/exercises-service";
import {FileFilter} from "../file-filter.pipe/file-filter.pipe";




@Component({
  moduleId: module.id,
  selector: 'attachment-view',
  templateUrl: 'attachment-view.component.html',
  styleUrls: ['attachment-view.component.css'],
  directives: [AudioPlayerComponent],
  pipes: [FileFilter]
})
export class AttachmentViewComponent implements OnInit, OnChanges {

  @Input()
  private exercise:Exercise;


  ngOnInit() {
  }

  ngOnChanges(changes):void {

  }


}
