import {Component, OnInit, Input} from "@angular/core";
import {Exercise} from "../../../model/exercise";

@Component({
  moduleId: module.id,
  selector: 'manage-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {

  editMode = false;

  @Input()
  exercise:Exercise;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.exercise);
    this.editMode = false;
  }
}
