import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() selectedBoss: EventEmitter<Boss> = new EventEmitter<Boss>();

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
    .filter(boss =>
      boss.name.toLowerCase().startsWith(query)
    );
  }

  selectSuggestion(boss: Boss): void {
    this.guess = boss.name;
    this.filteredBosses = [];
    this.selectedBoss.emit(boss);
    this.guess = '';
  }
}
