import { Component, OnInit, Input } from '@angular/core';
import {ExercisesService} from "../../../../services/exercises-service";
import {Exercise} from "../../../../model/exercise";
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'label-editor',
  templateUrl: 'label-editor.component.html',
  styleUrls: ['label-editor.component.css'],
  directives: [TYPEAHEAD_DIRECTIVES]
})
export class LabelEditorComponent implements OnInit {

  @Input()
  private exercise:Exercise;

  @Input()
  private editMode:boolean;

  private labelSuggestions = [];
  private selected = '';

  constructor(private exerciseService:ExercisesService) {

  }

  removeLabel(label: string) {
    this.exercise.labels.splice(_.indexOf(this.exercise.labels, label), 1);
  }

  addSelectedLabel() {
    if(this.selected && _.indexOf(this.exercise.labels, this.selected) === -1) {
      this.exercise.labels.unshift(this.selected);
      this.selected = '';
    }
  }

  ngOnInit() {
    this.exerciseService.getLabels().subscribe(labels => {
        this.labelSuggestions = labels;
      }
    )
  }

}
