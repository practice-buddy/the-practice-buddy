import { Component, OnInit } from '@angular/core';
import {ListComponent} from "./list/list.component";
import {DetailComponent} from "./detail/detail.component";

@Component({
  moduleId: module.id,
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.css'],
  directives: [ListComponent, DetailComponent]

})
export class ManageComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
