import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements AfterViewInit {
  @Input() src: string = '';
  @ViewChild('myaudio') audioRef!: ElementRef<HTMLAudioElement>;
  isPlaying = false;
  duration = 0;
  currentTime = 0;

  showVolume = false;
  volume = 0.1; 

  changeVolume(event: Event) {
    const target = event.target as HTMLInputElement;
    this.volume = parseFloat(target.value);
    this.audioRef.nativeElement.volume = this.volume;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const audio = this.audioRef.nativeElement;
      audio.currentTime = 0;
      audio.pause();
      if (audio) {
        audio.volume = this.volume;
      }
    }, 100);
  }


  togglePlay() {
    const audio = this.audioRef.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  onMetadata() {
    this.duration = this.audioRef.nativeElement.duration * 1000;
  }

  onTimeUpdate() {
    this.currentTime = this.audioRef.nativeElement.currentTime * 1000;
  }

  seek(event: MouseEvent) {
    const container = (event.currentTarget as HTMLElement);
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    const newTime = (percent * this.duration) / 1000;
    this.audioRef.nativeElement.currentTime = newTime;
  }
}
