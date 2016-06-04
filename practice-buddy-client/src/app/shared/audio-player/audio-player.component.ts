import { Component, OnInit, OnChanges, ViewChild, Input, OnDestroy  } from '@angular/core';
import 'wavesurfer.js';
import 'wavesurfer.regions';
import * as _ from 'lodash';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import { Location } from '@angular/common';

import {ExerciseAttachment} from "../../model/exerciseAttachments";

declare var WaveSurfer:any; // Magic

@Component({
  moduleId: module.id,
  selector: 'audio-player',
  templateUrl: 'audio-player.component.html',
  styleUrls: ['audio-player.component.css'],
  directives: [BUTTON_DIRECTIVES, ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
  host: {'(window:keydown)': 'handleKeyDown($event)'},
  providers: [ROUTER_PROVIDERS]
})
export class AudioPlayerComponent implements OnChanges, OnInit, OnDestroy {

  @Input()
  private audioFiles:ExerciseAttachment[] = [];

  private practiceMode = false;

  private playbackRate:number = 100;

  private volume:number = 80;

  private wavesurfer;

  private loop = false;

  private playing;

  private selectedRegion;

  private regions = [];

  private selectedAudioFile;

  constructor(private location:Location) {

  }

  selectAudioFile(audioFile) {
    this.destroyWavesurfer();
    this.lazyInitWaveSurfer();
    this.selectedAudioFile = audioFile;
    this.wavesurfer.load('/attachments/' + this.selectedAudioFile.content);
  }

  private destroyWavesurfer() {
    this.wavesurfer.empty();
    this.wavesurfer.destroy();
    this.wavesurfer = null;
    this.playing = false;
    this.regions.length = 0;
  };

  ngOnDestroy() {
    this.destroyWavesurfer();
  }

  handleKeyDown(key) {
    if (!this.practiceMode) {
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
    this.practiceMode = location.pathname === '/execute';
  }

  private lazyInitWaveSurfer() {
    if (this.wavesurfer == null) {
      this.wavesurfer = new WaveSurfer.create({
        container: '#waveform',
        waveColor: '#87CEFA ',
        progressColor: 'lightBlue',
        backend: 'MediaElement'
      });

      this.wavesurfer.on('ready', () => {

        // Enable creating regions by dragging
        if (this.practiceMode) {
          this.wavesurfer.enableDragSelection({});
        }

        this.wavesurfer.on('play', () => {
          this.playing = true;
        });
        this.wavesurfer.on('pause', () => {
          this.playing = false;
        });
        this.wavesurfer.on('finish', () => {
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

  updateVolume(volume:number) {
    this.wavesurfer.setVolume(volume / 100)
  };

  onChangeLoop() {
    this.loop = !this.loop;
    console.log(this.loop);
    _.forEach(this.regions, (region) => {
      region.update({loop: this.loop});
    });
  }

  playRegion(region) {
    region.play();
  }

  play() {
    this.wavesurfer.play();
  }

  togglePlay() {
    this.wavesurfer.playPause();
  }
}


