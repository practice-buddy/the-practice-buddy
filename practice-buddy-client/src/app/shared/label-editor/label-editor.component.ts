import { Component, OnInit, Input,Output , EventEmitter } from '@angular/core';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import * as _ from 'lodash';
import {ExercisesService} from "../../services/exercises-service";

@Component({
  moduleId: module.id,
  selector: 'label-editor',
  templateUrl: 'label-editor.component.html',
  styleUrls: ['label-editor.component.css'],
  directives: [TYPEAHEAD_DIRECTIVES]
})
export class LabelEditorComponent implements OnInit {

  @Input()
  private selectedLabels:string[] = [];

  @Input()
  private editMode:boolean;

  @Input()
  private placeholder: string = 'Label';

  @Output('labelsChanged') labelsChanged = new EventEmitter<string[]>();
  private labelSuggestions = [];
  private selected = '';

  constructor(private exerciseService:ExercisesService) {

  }

  removeLabel(label:string) {
    this.selectedLabels.splice(_.indexOf(this.selectedLabels, label), 1);
    this.labelsChanged.emit(this.selectedLabels);
  }

  addSelectedLabel() {
    let labelToAdd = this.selected;
    if (labelToAdd && _.indexOf(this.selectedLabels, labelToAdd) === -1) {
      this.selectedLabels.unshift(labelToAdd);
      this.labelsChanged.emit(this.selectedLabels);
    }
    this.selected = '';
  }

  ngOnInit() {
    this.exerciseService.getLabels().subscribe(labels => {
        this.labelSuggestions = labels;
      }
    )
  }

}
