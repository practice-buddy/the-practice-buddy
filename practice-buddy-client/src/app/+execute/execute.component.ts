import {Component, OnInit} from "@angular/core";
import {Exercise} from "../model/exercise";
import {ExecuteExerciseComponent} from "./execute-exercise/execute-exercise.component";
import {FocusListComponent} from "./focus-list/focus-list.component";
import {PracticeFocusService} from "../services/practice-focus-service";
import {PracticeFocus} from "../model/practice-focus";

@Component({
  moduleId: module.id,
  selector: 'app-execute',
  templateUrl: 'execute.component.html',
  styleUrls: ['execute.component.css'],
  directives: [ExecuteExerciseComponent, FocusListComponent],
  providers: [PracticeFocusService]
})
export class ExecuteComponent implements OnInit {

  practiceFocus:PracticeFocus;

  selectedExercise:Exercise;

  private errorMessage;

  constructor(private practiceFoccusService:PracticeFocusService) {
  }

  onExerciseSelect(exercise:Exercise) {
    this.selectedExercise = exercise;
  }

  ngOnInit() {
    this.practiceFoccusService.getExerciseFocus()
      .subscribe(
        practiceFocus => this.practiceFocus = practiceFocus,
        error => this.errorMessage = <any>error);
  }
}
