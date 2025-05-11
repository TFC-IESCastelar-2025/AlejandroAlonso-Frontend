// src/app/pages/music-guess/music-guess.component.ts
import { Component, OnInit } from '@angular/core';
import { Boss } from 'src/app/interfaces/boss.interface';
import { BossService } from 'src/app/services/boss.service';

@Component({
  selector: 'app-music-guess',
  templateUrl: './music-guess.component.html'
})
export class MusicGuessComponent implements OnInit {
  musicUrl: string = '';
  boss!: Boss;
  bossName: string = '';
  guess: string = '';
  solved: boolean = false;
  bossList: Boss[] = []; 
  filteredBosses: Boss[] = [];
  attempts: Boss[] = [];
  chosenBosses: { boss: Boss; correct: boolean }[] = [];
  resetCountdown: string = '';
  private countdownInterval: any;

  constructor(private bossService: BossService) {}

  ngOnInit(): void {
    this.getMusicForToday();

    this.bossService.getAllBosses().subscribe((bosses: Boss[]) => {
        this.bossList = bosses;
    });
  }

  getMusicForToday(): void {
    this.bossService.getRandomBossMusicForToday().subscribe(response => {
      this.musicUrl = response.music;
      this.bossName = response.name;
      this.boss = response;
    });
  }
  

  onBossSelected(boss: Boss): void {
    this.attempts.push(boss);
  
    if (this.boss && this.boss.name.toLowerCase() === boss.name.toLowerCase()) {
      this.solved = true;
    }
  
    const isCorrect = this.boss && this.boss.name.toLowerCase() === boss.name.toLowerCase();
    this.chosenBosses.push({ boss: boss, correct: isCorrect });
  }
  

//   onSearch(): void {
//     const query = this.guess.toLowerCase();
//     this.filteredBosses = this.bossList
//     .filter(boss => boss.name.toLowerCase().startsWith(query));
//   }

//   selectSuggestion(bossName: string): void {
//     const selectedBoss = this.bossList.find(b => b.name === bossName);
//     if (selectedBoss) {
//         const isCorrect = bossName.toLowerCase() === this.bossName.toLowerCase();
//         this.chosenBosses.push({ boss: selectedBoss, correct: isCorrect });
//     }
//     this.guess = bossName;
//     this.filteredBosses = [];
//     this.onGuess();
//   }
  

//   onGuess(): void {
//     if (this.guess.toLowerCase() === this.bossName.toLowerCase()) {
//       this.solved = true;
//       this.startCountdown();
//     }
//     this.guess = '';  // Limpiar el campo de entrada
//   }

  startCountdown() {
    const update = () => {
      const now = new Date();
  
      // Hora de ahora en Madrid
      const nowMadrid = new Date(now.toLocaleString("es-ES", { timeZone: "Europe/Madrid" }));
  
      const tomorrow = new Date(nowMadrid);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
  
      const diff = tomorrow.getTime() - nowMadrid.getTime();
  
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
  
      this.resetCountdown = `${hours}h ${minutes}m ${seconds}s`;
    };
  
    update();
    this.countdownInterval = setInterval(update, 1000);
  }  
}
