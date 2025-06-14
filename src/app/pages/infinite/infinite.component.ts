import { Component, OnInit } from '@angular/core';
import { BossService } from 'src/app/services/boss.service';
import { Boss } from 'src/app/interfaces/boss.interface';

@Component({
  standalone: false,
  selector: 'app-infinte',
  templateUrl: './infinite.component.html',
  styleUrls: ['./infinite.component.css']
})
export class InfiniteComponent implements OnInit {
  boss!: Boss; 
  attempts: Boss[] = [];
  guess: string = '';
  solved: boolean = false; 
  bossList: Boss[] = []; 
  filteredBosses: Boss[] = [];
  lives: number = 15;
  isGameOver: boolean = false;

  constructor(private bossService: BossService) {}

  ngOnInit(): void {
    this.bossService.getRandomBoss().subscribe(boss => this.boss = boss);
    
    this.bossService.getAllBosses().subscribe((bosses: Boss[]) => {
      this.bossList = bosses;
    });
  }

  // onSearch(): void {
  //   const query = this.guess.toLowerCase();
  //   this.filteredBosses = this.bossList
  //   .filter(boss => boss.name.toLowerCase().startsWith(query));
  // }

  // selectSuggestion(boss: string): void {
  //   this.guess = boss;
  //   this.filteredBosses = [];
  //   this.onGuess();
  // }

  onBossSelected(boss: Boss): void {
    this.attempts.push(boss);

    if (this.boss.name.toLowerCase() === boss.name.toLowerCase()) {
      this.solved = true;
    } else {
      this.lives--;
      if (this.lives <= 0) {
        this.isGameOver = true;
      }
    }
  }


  // onGuess(): void {
  //   const match = this.bossList.find(
  //     b => b.name.toLowerCase() === this.guess.toLowerCase()
  //   );

  //   if (!match) return;

  //   this.attempts.push(match);

  //   if (this.boss.name.toLowerCase() === this.guess.toLowerCase()) {
  //     this.solved = true; 
  //   }
  //   console.log(this.boss)
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

  reiniciar(): void {
    this.attempts = [];
    this.guess = '';
    this.solved = false;
    this.filteredBosses = [];
    this.lives = 15;
    this.isGameOver = false;

    this.bossService.getRandomBoss().subscribe(boss => this.boss = boss);
  }

  
}
