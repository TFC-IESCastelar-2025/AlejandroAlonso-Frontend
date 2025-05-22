import { Component, OnInit } from '@angular/core';
import { Boss } from 'src/app/interfaces/boss.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BossService } from 'src/app/services/boss.service';

@Component({
  selector: 'app-music-guess',
  templateUrl: './music-guess.component.html',
  styleUrls: ['./music-guess.component.css']
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
  start: boolean = false;
  private countdownInterval: any;

  constructor(private bossService: BossService, private authService: AuthService) {}

  ngOnInit(): void {
    this.bossService.getAllBosses().subscribe((bosses: Boss[]) => {
      this.bossList = bosses;

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
            const parsed: { bossId: number; correct: boolean }[] = JSON.parse(storedBosses);
            this.chosenBosses = parsed.map(entry => {
              const fullBoss = this.bossList.find(b => b.id === entry.bossId);
              return fullBoss ? { boss: fullBoss, correct: entry.correct } : null;
            }).filter((e): e is { boss: Boss; correct: boolean } => e !== null);

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
    });
  }

  onBossSelected(boss: Boss): void {
    console.log('Intento seleccionado:', boss);
    this.start = true;

    this.attempts.push(boss);
    const isCorrect = this.boss && this.boss.name.toLowerCase() === boss.name.toLowerCase();
    this.chosenBosses.push({ boss, correct: isCorrect });
    const minimalData = this.chosenBosses.map(entry => ({
      bossId: entry.boss.id,
      correct: entry.correct
    }));

    try {
      localStorage.setItem('musicChosenBosses', JSON.stringify(minimalData));
      console.log('Guardado en localStorage:', localStorage.getItem('musicChosenBosses'));
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
    }

    if (isCorrect) {
      this.solved = true;
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('musicSolvedDate', today);
      this.startCountdown();

      const token = this.authService.getToken();
      if (token && !this.authService.isTokenExpired()) {
        this.bossService.acertarBoss(boss.id).subscribe({
          next: () => console.log('Boss musical acertado guardado.'),
          error: err => console.error('Error al guardar el boss musical', err),
        });
      }
    }
  }

  startCountdown() {
    const update = () => {
      const now = new Date();
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
