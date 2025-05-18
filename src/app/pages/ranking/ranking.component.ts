import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserRanking } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  ranking: UserRanking[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getRankingUsersBosses().subscribe({
      next: (data) => {
        this.ranking = data.sort((a, b) => b.bossesCount - a.bossesCount);
      },
      error: (err) => {
        console.error('Error al obtener el ranking', err);
      }
    });
  }
}
