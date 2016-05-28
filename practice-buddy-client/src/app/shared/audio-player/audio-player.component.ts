import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'audio-player',
  templateUrl: 'audio-player.component.html',
  styleUrls: ['audio-player.component.css']
})
export class AudioPlayerComponent implements OnChanges {


  @ViewChild('player')
  private player: any;

  @Input()
  private src: string;

  @Input()
  private playbackRate: number;

  constructor() {
  }

  ngOnChanges(changes):any {
    if(this.player) {
      this.player.nativeElement.playbackRate = this.playbackRate/200 + 0.5;
    }
  }

}


