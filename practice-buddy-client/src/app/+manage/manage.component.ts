import {Component, OnInit} from "@angular/core";
import {DetailComponent} from "./detail/detail.component";
import {Exercise} from "../model/exercise";
import {ExercisesService} from "../services/exercices-service";
import {LibraryListComponent} from "./library-list/library-list.component";

@Component({
  moduleId: module.id,
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.css'],
  directives: [DetailComponent, LibraryListComponent],
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
  
  ngOnInit():any {
  }

}
