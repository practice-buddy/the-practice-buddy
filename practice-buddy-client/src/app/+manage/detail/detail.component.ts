import {Component, OnInit, Input} from "@angular/core";
import {Exercise} from "../../model/exercise";
import {ExercisesService} from "../../services/exercices-service";
import {AutoComplete} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'manage-detail',
  templateUrl: 'detail.component.html',
  directives: [AutoComplete],
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {

  editMode = false;

  @Input() exercise:Exercise;

  private errorMessage;


  results = ['Blaaaaaaa', 'Bluuuuuuuuuuu'];

  constructor(private exercisesService:ExercisesService) {}

  ngOnInit() {
  }

  search(event) {
    let query = event.query;
    this.results.push(query);
  }

  onSubmit(){
    console.log(this.exercise);
    this.exercisesService.updateExercise(this.exercise).subscribe(
      error =>  this.errorMessage = <any>error);;
    this.editMode = false;
  }
}
