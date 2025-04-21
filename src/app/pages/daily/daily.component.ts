import { Component, OnInit } from '@angular/core';
import { BossService } from 'src/app/services/boss.service';
import { Boss } from 'src/app/interfaces/boss.interface';

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
  filteredBosses: string[] = []; 

  constructor(private bossService: BossService) {}

  ngOnInit(): void {
    this.bossService.getDailyBoss().subscribe(boss => this.boss = boss);

    this.bossService.getAllBosses().subscribe((bosses: Boss[]) => {
      this.bossList = bosses;
    });
  }

  onSearch(): void {
    const query = this.guess.toLowerCase();
    this.filteredBosses = this.bossList
    .filter(boss => boss.name.toLowerCase().startsWith(query)) 
    .map(boss => boss.name);
  }

  selectSuggestion(boss: string): void {
    this.guess = boss;
    this.filteredBosses = [];
  }

  onGuess(): void {
    const match = this.bossList.find(
      b => b.name.toLowerCase() === this.guess.toLowerCase()
    );

    if (!match) return;

    this.attempts.push(match);

    if (this.boss.name.toLowerCase() === this.guess.toLowerCase()) {
      this.solved = true; 
    }

    this.guess = '';
    this.filteredBosses = [];
  }

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

  isMatch(field: keyof Boss, attempt: Boss): boolean {
    return attempt[field] === this.boss[field];
  }
  
}
