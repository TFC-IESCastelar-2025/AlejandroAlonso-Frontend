import { Component, OnInit } from '@angular/core';
import { BossService } from 'src/app/services/boss.service';
import { Boss } from 'src/app/interfaces/boss.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {
  boss!: Boss;
  attempts: Boss[] = [];
  guess: string = '';
  solved: boolean = false;
  bossList: Boss[] = [];
  filteredBosses: Boss[] = [];
  resetCountdown: string = '';
  streak: number = 0;
  isLoggedIn: boolean = false;
  showModal: boolean = false;
  private countdownInterval: any;

  constructor(private bossService: BossService, private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.authService.authStatus.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadStreakFromBackend();
      }
      this.checkAndShowModal(today);
    });

    this.bossService.getAllBosses().subscribe((bosses: Boss[]) => {
      this.bossList = bosses;

      this.bossService.getDailyBoss().subscribe(boss => {
        const savedBossId = localStorage.getItem('dailyBossId');

        if (savedBossId && parseInt(savedBossId, 10) !== boss.id) {
          Object.keys(localStorage).forEach(key => {
            if (key.startsWith('dailySolved_') || key.startsWith('dailyAttempts_')) {
              localStorage.removeItem(key);
            }
          });
        }

        localStorage.setItem('dailyBossId', boss.id.toString());
        this.boss = boss;

        const solvedId = localStorage.getItem('dailySolved_' + today);
        if (solvedId && parseInt(solvedId, 10) === boss.id) {
          this.solved = true;
          if (this.isLoggedIn) {
            this.loadStreakFromBackend();
          }
          this.checkAndShowModal(today); 
          this.startCountdown();
        }

        const savedAttempts = localStorage.getItem('dailyAttempts_' + today);
        if (savedAttempts) {
          try {
            const ids: number[] = JSON.parse(savedAttempts);
            this.attempts = ids
              .map(id => this.bossList.find(b => b.id === id))
              .filter((b): b is Boss => b !== undefined);
          } catch {
            localStorage.removeItem('dailyAttempts_' + today);
          }
        }
      });
    });
  }

  onModalClose(shouldRedirect: boolean): void {
    this.showModal = false;

    if (shouldRedirect) {
      this.router.navigate(['/login']);
    }
  }

  checkAndShowModal(today: string) {
    const dontRemind = localStorage.getItem('dontRemindLoginModal');
    const solvedId = localStorage.getItem('dailySolved_' + today);
    if (solvedId && parseInt(solvedId, 10) === this.boss?.id && !this.isLoggedIn && !dontRemind) {
      this.showModal = true;
    }
  }

  handleDontRemind(checked: boolean): void {
    if (checked) {
      localStorage.setItem('dontRemindLoginModal', 'true');
    }
  }

  private loadStreakFromBackend(): void {
    this.userService.getUserStreak().subscribe({
      next: (streak: number) => {
        this.streak = streak;
      },
      error: err => {
        console.error('Error obteniendo el streak del usuario', err);
        this.streak = 0;
      }
    });
  }

  // private loadStreak(today: string) {
  //   const savedStreak = localStorage.getItem('dailyStreak');
  //   this.streak = savedStreak ? parseInt(savedStreak, 10) : 0;

  //   const yesterdayDate = new Date(today);
  //   yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  //   const yesterday = yesterdayDate.toISOString().split('T')[0];
  //   const solvedYesterday = localStorage.getItem('dailySolved_' + yesterday);

  //   if (solvedYesterday) {
  //     this.streak++;
  //   } else {
  //     this.streak = 1;
  //   }
  //   localStorage.setItem('dailyStreak', this.streak.toString());
  // }

  onBossSelected(boss: Boss): void {
    this.attempts.push(boss);

    const today = new Date().toISOString().split('T')[0];
    const attemptIds = this.attempts.map(b => b.id);

    try {
      localStorage.setItem('dailyAttempts_' + today, JSON.stringify(attemptIds));
    } catch (e) {
      console.error('Error al guardar intentos en localStorage', e);
    }

    if (this.boss.name.toLowerCase() === boss.name.toLowerCase()) {
      this.solved = true;
      if(this.isLoggedIn){
        this.userService.addUserStreak().subscribe({
          next: (updatedStreak) => this.streak = updatedStreak,
          error: (err) => {
            if (err.status !== 403) {
              console.error('Error al actualizar el streak', err);
            }
          }
        });
      } else {
        this.showModal=true;
      }

      this.startCountdown();

      const token = this.authService.getToken();
      if (token && !this.authService.isTokenExpired()) {
        this.bossService.acertarBoss(boss.id).subscribe({
          next: () => console.log('Boss saved to user history.'),
          error: err => console.error('Error saving boss guess', err),
        });
      }

      localStorage.setItem('dailySolved_' + today, this.boss.id.toString());
    }
  }

  compareHealth(boss: Boss): string {
    if (boss.health > this.boss.health) {
      return '<i class="fa-solid fa-chevron-down"></i>';
    } else if (boss.health < this.boss.health) {
      return '<i class="fa-solid fa-chevron-up"></i>';
    }
    return '';
  }

  compareSouls(boss: Boss): string {
    if (boss.souls > this.boss.souls) {
      return '<i class="fa-solid fa-chevron-down"></i>';
    } else if (boss.souls < this.boss.souls) {
      return '<i class="fa-solid fa-chevron-up"></i>';
    }
    return '';
  }

  getFiguresClass(attempt: Boss): string {
    const correctFigures = this.boss.figures || [];
    const attemptedFigures = attempt.figures || [];

    const matchedFigures = attemptedFigures.filter(f => correctFigures.includes(f));

    if (matchedFigures.length === 0) {
      return 'bg-danger text-white';
    } else if (
      matchedFigures.length === correctFigures.length &&
      attemptedFigures.length === correctFigures.length
    ) {
      return 'bg-success text-white';
    } else {
      return 'bg-warning text-dark';
    }
  }

  isMatch(field: keyof Boss, attempt: Boss): boolean {
    return attempt[field] === this.boss[field];
  }

  startCountdown() {
    const update = () => {
      const now = new Date();
      const nowMadrid = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Andorra" }));

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