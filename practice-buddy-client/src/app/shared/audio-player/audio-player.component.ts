import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';
import 'wavesurfer.js';
import 'wavesurfer.regions';
import * as _ from 'lodash';
import {ExerciseAttachment} from "../../model/exerciseAttachments";

declare var WaveSurfer:any; // Magic

@Component({
  moduleId: module.id,
  selector: 'audio-player',
  templateUrl: 'audio-player.component.html',
  styleUrls: ['audio-player.component.css'],
  host: {'(window:keydown)': 'handleKeyDown($event)'},
})
export class AudioPlayerComponent implements OnChanges, OnInit {

  @Input()
  private audioFiles:ExerciseAttachment[];

  private playbackRate:number = 100;

  private wavesurfer;

  private loop;

  private playing;

  private selectedRegion;

  private regions = [];

  private selectedAudioFile;
  private active=false;

  constructor() {

  }

  toggleActive(){
    this.active = !this.active;
    console.log(this.active)
  }


  selectAudioFile(audioFile) {
    this.wavesurfer.destroy();
    this.wavesurfer = null;
    this.playing = false;
    this.regions.length = 0;
    this.lazyInitWaveSurfer();
    this.selectedAudioFile = audioFile;
    this.wavesurfer.load('/attachments/' + this.selectedAudioFile.content);
  }


  handleKeyDown(key) {
    if(!this.active) {
      return;
    }
    let number = parseInt(String.fromCharCode(key.which));
    if (_.isNumber(number) && number > 0 && number <= this.regions.length) {
      this.regions[number - 1].play();
    }

    if (key.keyIdentifier === 'Left' || key.keyIdentifier === 'Right') {
      this.handleLeftRightKey(key);
    }

    if (key.keyIdentifier === 'Up') {
      this.updatePlaybackRate(this.playbackRate + 10);
    }
    if (key.keyIdentifier === 'Down') {
      this.updatePlaybackRate(this.playbackRate - 10);
    }

    if (key.code === 'Space') {
      this.wavesurfer.playPause();
    }

  }

  private handleLeftRightKey(key) {
    if (this.regions.length === 0) {
      this.wavesurfer.seekTo(0);
    }
    else {
      this.jumpToNextOrPreviousRegion(key);
    }
  };

  private jumpToNextOrPreviousRegion(key) {
    if (!this.selectedRegion) {
      this.selectedRegion = this.regions[0];
    }
    let isAfterCurrentRegionStart = this.wavesurfer.getCurrentTime() > (this.selectedRegion.start + 0.5);
    let isBeforeCurrentRegionEnd = this.wavesurfer.getCurrentTime() < this.selectedRegion.end;

    if (key.keyIdentifier === 'Left' && (isAfterCurrentRegionStart) && (isBeforeCurrentRegionEnd)) {
      console.log(this.selectedRegion);
      this.seekToRegionStart(this.selectedRegion);
    } else {
      this.selectedRegion = this.getNextRegion(key);
      this.seekToRegionStart(this.selectedRegion);
    }

  };

  private seekToRegionStart(region) {
    region = region || this.selectedRegion;
    this.wavesurfer.seekTo(region.start / this.wavesurfer.getDuration());
  };

  private getNextRegion(key) {
    let sortedRegions = _.orderBy(this.regions, 'start');
    let modifier = key.keyIdentifier === 'Left' ? -1 : +1;
    let indexOfNextRegion = Math.max(_.indexOf(sortedRegions, this.selectedRegion) + modifier, 0);
    indexOfNextRegion = Math.min(indexOfNextRegion, this.regions.length - 1);
    return sortedRegions[indexOfNextRegion];
  };

  ngOnInit() {
  }

  private lazyInitWaveSurfer() {
    if (this.wavesurfer == null) {
      this.wavesurfer = new WaveSurfer.create({
        container: '#waveform',
        waveColor: 'lightBlue',
        progressColor: 'darkBlue',
        backend: 'MediaElement'
      });

      this.wavesurfer.on('ready', () => {

        // Enable creating regions by dragging
        this.wavesurfer.enableDragSelection({});

        this.wavesurfer.on('play', () => {
          this.playing = true;
        });
        this.wavesurfer.on('pause', () => {
          this.playing = false;
        });
        this.wavesurfer.on('region-created', (region)=> {
          this.selectedRegion = region;
          region.once('play', () => {

            region.update({loop: this.loop});
            this.selectedRegion = region;
          });

          this.regions.push(region);

        });
      });
    }
  };

  removeRegion(region) {
    this.regions.splice(_.indexOf(this.regions, region), 1);
    region.remove();
  }

  ngOnChanges(changes):any {
    this.lazyInitWaveSurfer();
    if (changes['playbackRate']) {
      this.updatePlaybackRate(this.playbackRate);
    }
    if (changes['audioFiles']) {
      if (this.audioFiles.length > 0) {
        this.selectAudioFile(this.audioFiles[0])
      }
    }
  }

  updatePlaybackRate(playbackRate:number) {
    this.playbackRate = Math.max(0, Math.min(100, playbackRate));
    var calculatedRate = Math.max(0.5, Math.min(1, playbackRate / 200 + 0.5));
    this.wavesurfer.backend.setPlaybackRate(calculatedRate);
  };

  onChangeLoop(checked) {
    this.loop = checked;
    if (this.selectedRegion) {
      this.selectedRegion.update({loop: this.loop});
    }
  }

  play() {
    this.wavesurfer.play();
  }

  togglePlay() {
    this.wavesurfer.playPause();
  }
}


