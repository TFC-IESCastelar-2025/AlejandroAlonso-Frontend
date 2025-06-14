// src/app/pages/music-guess/music-guess-infinite.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Boss } from 'src/app/interfaces/boss.interface';
import { BossService } from 'src/app/services/boss.service';

@Component({
  selector: 'app-music-guess-infinite',
  templateUrl: './music-guess-infinite.component.html',
  styleUrls: ['./music-guess-infinite.component.css']
})
export class MusicGuessInfiniteComponent implements OnInit {
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
  start: boolean = false;
  lives: number = 15;
  isGameOver: boolean = false;
  private countdownInterval: any;

  constructor(private bossService: BossService) {}

  ngOnInit(): void {
    this.getRandomMusic();

    this.bossService.getAllBosses().subscribe((bosses: Boss[]) => {
        this.bossList = bosses;
    });
  }

  getRandomMusic(): void {
    this.bossService.getRandomBossMusic().subscribe(response => {
      this.musicUrl = response.music;
      this.bossName = response.name;
      this.boss = response;
    });
  }
  

  onBossSelected(boss: Boss): void {
    this.start = true;
    this.attempts.push(boss);
  
    if (this.boss && this.boss.name.toLowerCase() === boss.name.toLowerCase()) {
      this.solved = true;
    } else {
      this.lives--;
      if (this.lives <= 0) {
        this.isGameOver = true;
      }
    }
  
    const isCorrect = this.boss && this.boss.name.toLowerCase() === boss.name.toLowerCase();
    this.chosenBosses.push({ boss: boss, correct: isCorrect });
  }

  reiniciar(): void {
    this.solved = false;
    this.attempts = [];
    this.chosenBosses = [];
    this.lives = 15;
    this.isGameOver = false;
    this.start = false;
    this.getRandomMusic();
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
}
