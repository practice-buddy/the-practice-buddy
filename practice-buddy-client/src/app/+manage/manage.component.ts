import { Component, OnInit } from '@angular/core';
import {DetailComponent} from "./detail/detail.component";
import {Exercise} from "../../model/exercise";

@Component({
  moduleId: module.id,
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.css'],
  directives: [ DetailComponent]

})
export class ManageComponent implements OnInit {

  exercises:Exercise[] = [
    {title: "Ex 1", text: "Do Ex 1"},
    {title: "Ex 2", text: "Do Ex 2"},
    {title: "Ex 3", text: "Do Ex 3"},
    {title: "Ex 4", text: "Do Ex 4"}
  ];


  selectedExercise:Exercise;

  onSelect(exercise:Exercise) {
    this.selectedExercise = exercise;
  }


  constructor() {}

  ngOnInit() {
  }

}
