import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserRanking, UserRankingStreak } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  rankingBosses: UserRanking[] = [];
  rankingStreak: UserRankingStreak[] = [];
  activeRanking: 'bosses' | 'streak' | '' = '';

  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchBossesRanking();
    this.fetchStreakRanking();
  }

  toggleRanking(type: 'bosses' | 'streak') {
    this.activeRanking = type;
    this.currentPage = 1;
  }

  fetchBossesRanking() {
    this.userService.getRankingUsersBosses().subscribe({
      next: (data) => {
        this.rankingBosses = data
          .filter(user => user && user.bossesCount !== undefined)
          .sort((a, b) => (b.bossesCount ?? 0) - (a.bossesCount ?? 0));
      },
      error: (err) => {
        console.error('Error al obtener el ranking por bosses', err);
      }
    });
  }

  fetchStreakRanking() {
    this.userService.getRankingUserStreak().subscribe({
      next: (data) => {
        this.rankingStreak = data
          .filter(user => user && user.maxStreak !== undefined)
          .sort((a, b) => (b.maxStreak ?? 0) - (a.maxStreak ?? 0));
      },
      error: (err) => {
        console.error('Error al obtener el ranking por racha', err);
      }
    });
  }
}
