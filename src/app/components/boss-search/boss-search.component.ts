import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Boss } from 'src/app/interfaces/boss.interface';
import { BossService } from 'src/app/services/boss.service';

@Component({
  selector: 'app-boss-search',
  templateUrl: './boss-search.component.html'
})
export class BossSearchComponent {
  boss!: Boss; 
  bossList: Boss[] = []; 
  guess: string = '';
  filteredBosses: Boss[] = [];
  listPosition = { top: 0, left: 0, width: 0 };

  @Input() attempts: Boss[] = []; 
  @Output() selectedBoss: EventEmitter<Boss> = new EventEmitter<Boss>();

  constructor(private bossService: BossService) {}

  ngOnInit(): void {
    this.bossService.getAllBosses().subscribe((bosses: Boss[]) => {
      this.bossList = bosses;
    });
  }

  onSearch(): void {
    const query = this.guess.toLowerCase();

    this.filteredBosses = this.bossList
      .filter(boss =>
        boss.name.toLowerCase().startsWith(query) &&
        !this.attempts.some(attempt => attempt.id === boss.id)
      );

    setTimeout(() => {
      const inputEl = document.querySelector('#bossSearchInput') as HTMLElement;
      if (inputEl) {
        const rect = inputEl.getBoundingClientRect();
        this.listPosition = {
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        };
      }
    });
  }


  selectSuggestion(boss: Boss): void {
    this.guess = boss.name;
    this.filteredBosses = [];
    this.selectedBoss.emit(boss);
    this.guess = '';
  }
}
