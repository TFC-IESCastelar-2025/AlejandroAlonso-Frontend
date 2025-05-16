import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent implements AfterViewInit {
  @Input() src: string = '';
  @ViewChild('myaudio') audioRef!: ElementRef<HTMLAudioElement>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      const audio = this.audioRef.nativeElement;
      this.audioRef.nativeElement.currentTime = 0; 
      this.audioRef.nativeElement.pause();
      if (audio) {
        audio.volume = 0.15; 
      }
    }, 100); 
  }
}
