import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import {Exercise} from "../../model/exercise";

@Component({
  moduleId: module.id,
  selector: 'manage-library-list',
  templateUrl: 'library-list.component.html',
  styleUrls: ['library-list.component.css']
})
export class LibraryListComponent implements OnInit {

  @Input() exercises:Exercise[];
  @Output('exerciseSelected') exerciseSelected = new EventEmitter<Exercise>();

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(exercise:Exercise) {
    this.exerciseSelected.emit(exercise);
  }


}
