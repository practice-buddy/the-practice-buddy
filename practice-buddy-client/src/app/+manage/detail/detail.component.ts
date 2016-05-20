import { Component, OnInit, Input } from '@angular/core';
import {Exercise} from "../../../model/exercise";

@Component({
  moduleId: module.id,
  selector: 'manage-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input()
  exercise: Exercise;
  constructor() {}

  ngOnInit() {
  }

}
