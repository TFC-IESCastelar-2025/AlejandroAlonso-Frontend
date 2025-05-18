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
  streak: number = 0;
  private countdownInterval: any;

  constructor(private bossService: BossService) {}

  ngOnInit(): void {
    this.getMusicForToday();

    this.bossService.getAllBosses().subscribe((bosses: Boss[]) => {
      this.bossList = bosses;

      const savedAttempts = localStorage.getItem('musicChosenBosses');
      if (savedAttempts) {
        this.chosenBosses = JSON.parse(savedAttempts);

        this.chosenBosses = this.chosenBosses.map(entry => {
          const refreshedBoss = this.bossList.find(b => b.name === entry.boss.name);
          return refreshedBoss ? { boss: refreshedBoss, correct: entry.correct } : entry;
        });
      }
    });
  }


  getMusicForToday(): void {
    this.bossService.getRandomBossMusicForToday().subscribe(response => {
      this.musicUrl = response.music;
      this.bossName = response.name;
      this.boss = response;

      const today = new Date().toISOString().split('T')[0];
      const savedMusicBossId = localStorage.getItem('musicBossId');
      const savedDate = localStorage.getItem('musicSolvedDate');

      if (savedMusicBossId && savedMusicBossId !== String(this.boss.id)) {
        localStorage.removeItem('musicChosenBosses');
        localStorage.removeItem('musicSolvedDate');
      } else if (savedDate && savedDate !== today) {
        localStorage.removeItem('musicChosenBosses');
        localStorage.removeItem('musicSolvedDate');
      }

      localStorage.setItem('musicBossId', String(this.boss.id));
      localStorage.setItem('musicSolvedDate', today);

      const storedBosses = localStorage.getItem('musicChosenBosses');
      if (storedBosses && savedDate === today && savedMusicBossId === String(this.boss.id)) {
        try {
          this.chosenBosses = JSON.parse(storedBosses);
          this.attempts = this.chosenBosses.map(e => e.boss);
          this.solved = this.chosenBosses.some(e => e.correct);
          if (this.solved) {
            this.startCountdown();
          }
        } catch {
          localStorage.removeItem('musicChosenBosses');
          localStorage.removeItem('musicSolvedDate');
        }
      }
    });
  }


  onBossSelected(boss: Boss): void {
    console.log('Intento seleccionado:', boss);

    this.attempts.push(boss);
    const isCorrect = this.boss && this.boss.name.toLowerCase() === boss.name.toLowerCase();

    this.chosenBosses.push({ boss: boss, correct: isCorrect });
    console.log('Lista actualizada de intentos:', this.chosenBosses);

    localStorage.setItem('musicChosenBosses', JSON.stringify(this.chosenBosses));
    console.log('Guardado en localStorage:', localStorage.getItem('musicChosenBosses'));

    if (isCorrect) {
      this.solved = true;
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('musicSolvedDate', today);
      this.startCountdown();
    }
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
      const nowMadrid = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
  
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
