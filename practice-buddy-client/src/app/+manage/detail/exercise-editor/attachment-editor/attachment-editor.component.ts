import { Component, OnInit,Input } from '@angular/core';
import {Exercise} from "../../../../model/exercise";
import {ExerciseAttachment} from "../../../../model/exerciseAttachments";

@Component({
  moduleId: module.id,
  selector: 'attachment-editor',
  templateUrl: 'attachment-editor.component.html',
  styleUrls: ['attachment-editor.component.css']
})
export class AttachmentEditorComponent implements OnInit {


  @Input()
  private exercise:Exercise;

  ngOnInit() {
  }


  deleteAttachment(attachment:ExerciseAttachment) {
    attachment.deleted = true;
  }


}
