import {Component, OnInit} from "@angular/core";
import {DetailComponent} from "./detail/detail.component";
import {Exercise} from "../model/exercise";
import {ExercisesService} from "../services/exercices-service";
import {CreateNewExerciseComponent} from "./create-new-exercise/create-new-exercise.component";
import {LibraryListComponent} from "./library-list/library-list.component";

@Component({
  moduleId: module.id,
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.css'],
  directives: [DetailComponent, CreateNewExerciseComponent, LibraryListComponent],
  providers: [ExercisesService]
})
export class ManageComponent implements OnInit {

  selectedExercise:Exercise;
  private errorMessage;

  constructor(private exercisesService:ExercisesService) {
  }

  onExerciseSelect(exercise:Exercise) {
    this.selectedExercise = exercise;
  }

  onExerciseCreated() {
  }

  ngOnInit():any {
  }

}
