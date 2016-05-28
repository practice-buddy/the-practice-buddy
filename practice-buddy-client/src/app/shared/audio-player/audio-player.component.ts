import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'audio-player',
  templateUrl: 'audio-player.component.html',
  styleUrls: ['audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  @ViewChild('player') player;
  @Input() src;

  constructor() {
  }

  ngOnInit() {
  }

  setPlaySpeed(value:number) {
    this.player.nativeElement.playbackRate = value/200 + 0.5;
  }

}


