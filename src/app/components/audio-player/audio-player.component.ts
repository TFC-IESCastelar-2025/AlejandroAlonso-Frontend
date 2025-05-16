import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent implements AfterViewInit {
  @Input() src: string = '';
  @ViewChild('myaudio') audioRef!: ElementRef<HTMLAudioElement>;

  ngAfterViewInit(): void {
    // Esperamos un poco más para asegurarnos de que el elemento esté listo
    setTimeout(() => {
      const audio = this.audioRef.nativeElement;
      if (audio) {
        audio.volume = 0.15; // 15%
      }
    }, 100); // incluso puedes probar con 200ms si sigue sin funcionar
  }
}
