import {Component, Input} from "@angular/core";
import {Exercise} from "../../model/exercise";
import {MarkdownViewComponent} from "../markdown-view/markdown-view.component";
import {AudioPlayerComponent} from "../audio-player/audio-player.component";
import {ExerciseAttachment} from "../../model/exerciseAttachments";
import {ExercisesService} from "../../services/exercises-service";
import {AttachmentViewComponent} from "../attachment-view/attachment-view.component";
import {LabelEditorComponent} from "../label-editor/label-editor.component";


@Component({
  moduleId: module.id,
  selector: 'exercise-view',
  templateUrl: 'exercise-view.component.html',
  styleUrls: ['exercise-view.component.css'],
  directives: [MarkdownViewComponent, AttachmentViewComponent, LabelEditorComponent]
})
export class ExerciseViewComponent {


  @Input() exercise:Exercise;

  private audiofiles:ExerciseAttachment[] = [];

  constructor() {
  }


}
