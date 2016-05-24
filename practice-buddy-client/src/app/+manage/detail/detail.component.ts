import {Component, OnInit, Input} from "@angular/core";
import {Exercise} from "../../model/exercise";
import {ExercisesService} from "../../services/exercises-service";
import {ExerciseViewComponent} from "../../shared/exercise-view/exercise-view.component";
import {ExerciseEditorComponent} from "./exercise-editor/exercise-editor.component";

@Component({
  moduleId: module.id,
  selector: 'manage-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css'],
  directives: [ExerciseViewComponent, ExerciseEditorComponent]
})
export class DetailComponent implements OnInit {

  editMode = false;

  @Input() exercise:Exercise;


  ngOnInit() {
  }


}
