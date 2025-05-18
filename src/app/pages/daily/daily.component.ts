import { Component, OnInit } from '@angular/core';
import { BossService } from 'src/app/services/boss.service';
import { Boss } from 'src/app/interfaces/boss.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-daily',
  templateUrl: './daily.component.html',
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
  private countdownInterval: any;


  constructor(private bossService: BossService, private authService: AuthService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

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
        this.loadStreak(today);
        this.startCountdown();
      }

      const savedAttempts = localStorage.getItem('dailyAttempts_' + today);
      if (savedAttempts) {
        this.attempts = JSON.parse(savedAttempts);
      }
    });

    this.bossService.getAllBosses().subscribe((bosses: Boss[]) => {
      this.bossList = bosses;
    });
  }

  private loadStreak(today: string) {
    const savedStreak = localStorage.getItem('dailyStreak');
    this.streak = savedStreak ? parseInt(savedStreak, 10) : 0;


    const yesterdayDate = new Date(today);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];
    const solvedYesterday = localStorage.getItem('dailySolved_' + yesterday);

    if (solvedYesterday) {
      this.streak++;
    } else {
      this.streak = 1;
    }
    localStorage.setItem('dailyStreak', this.streak.toString());
  }

  
  onBossSelected(boss: Boss): void {
    this.attempts.push(boss);
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('dailyAttempts_' + today, JSON.stringify(this.attempts));
    
    if (this.boss.name.toLowerCase() === boss.name.toLowerCase()) {
      this.solved = true;
      this.loadStreak(today);  // Actualizar la racha al acertar
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
  
  // onSearch(): void {
  //   const query = this.guess.toLowerCase();
  //   this.filteredBosses = this.bossList
  //   .filter(boss => boss.name.toLowerCase().startsWith(query));
  // }

  // selectSuggestion(boss: string): void {
  //   this.guess = boss;
  //   this.filteredBosses = [];
  //   // this.onGuess();
  // }
  // onGuess(): void {
    //   const match = this.bossList.find(
      //     b => b.name.toLowerCase() === this.guess.toLowerCase()
      //   );
      
      //   if (!match) return;
      
      //   this.attempts.push(match);
      
      //   if (this.boss.name.toLowerCase() === this.guess.toLowerCase()) {
        //     this.solved = true; 
        //     this.startCountdown();
  //   }

  //   this.guess = '';
  //   this.filteredBosses = [];
  // }

  // Función para comparar vida
  compareHealth(boss: Boss): string {
    if (boss.health > this.boss.health) {
      return '<i class="fa-solid fa-chevron-down"></i>'; // Flecha hacia abajo si el boss tiene más vida
    } else if (boss.health < this.boss.health) {
      return '<i class="fa-solid fa-chevron-up"></i>'; // Flecha hacia arriba si el boss tiene menos vida
    }
    return ''; 
  }

  // Función para comparar almas
  compareSouls(boss: Boss): string {
    if (boss.souls > this.boss.souls) {
        return '<i class="fa-solid fa-chevron-down"></i>'; // Flecha hacia abajo si el boss tiene menos almas
    } else if (boss.souls < this.boss.souls) {
        return '<i class="fa-solid fa-chevron-up"></i>'; // Flecha hacia arriba si el boss tiene más almas
    }
    return '';
  }

  // Función para colores de figuras
  getFiguresClass(attempt: Boss): string {
    const correctFigures = this.boss.figures || [];
    const attemptedFigures = attempt.figures || [];
  
    const matchedFigures = attemptedFigures.filter(f => correctFigures.includes(f));
  
    if (matchedFigures.length === 0) {
      return 'bg-danger text-white';
    } else if (matchedFigures.length === correctFigures.length && attemptedFigures.length === correctFigures.length) {
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
  
      // Hora de ahora en Madrid
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
