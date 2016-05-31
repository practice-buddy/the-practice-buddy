import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';
import 'wavesurfer.js';
import 'wavesurfer.regions';

declare var WaveSurfer:any; // Magic

@Component({
  moduleId: module.id,
  selector: 'audio-player',
  templateUrl: 'audio-player.component.html',
  styleUrls: ['audio-player.component.css']
})
export class AudioPlayerComponent implements OnChanges, OnInit {

  @Input()
  private src:string;

  @Input()
  private playbackRate:number;

  private wavesurfer;

  private loop;

  private region;

  constructor() {

  }

  ngOnInit() {
    this.lazyInitWaveSurfer();
    this.wavesurfer.on('ready', () => {
      // Enable creating regions by dragging
      this.wavesurfer.enableDragSelection({});

      // Add a couple of pre-defined regions
      this.region = this.wavesurfer.addRegion({

        start: 1, // time in seconds
        end: 20, // time in seconds
        color: 'hsla(100, 100%, 30%, 0.1)'
      });

      this.wavesurfer.on('region-created', (region)=> {
        console.log(region)
      });
    });
  }

  private lazyInitWaveSurfer() {
    if (this.wavesurfer == null) {
      this.wavesurfer = new WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        backend: 'MediaElement'
      });
    }
  };


  ngOnChanges(changes):any {
    this.lazyInitWaveSurfer();
    if (changes['playbackRate']) {
      this.wavesurfer.backend.setPlaybackRate(this.playbackRate / 200 + 0.5);
    }
    if (changes['src']) {
      this.wavesurfer.load(this.src);
    }
  }

  onChangeLoop(checked) {
    console.log(checked)
    this.region.update({loop: checked});
  }

  play() {
    this.wavesurfer.playPause();
  }

}


