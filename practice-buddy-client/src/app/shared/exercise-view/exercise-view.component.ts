import {Component, OnInit, Input} from "@angular/core";
import {Exercise} from "../../model/exercise";
import {MarkdownViewComponent} from "../markdown-view/markdown-view.component";

@Component({
  moduleId: module.id,
  selector: 'exercise-view',
  templateUrl: 'exercise-view.component.html',
  styleUrls: ['exercise-view.component.css'],
  directives: [MarkdownViewComponent]
})
export class ExerciseViewComponent implements OnInit {

  @Input() exercise:Exercise;

  constructor() {
  }

  ngOnInit() {
  }

}
