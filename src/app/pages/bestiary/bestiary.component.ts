import { Component, OnInit } from '@angular/core';
import { Boss } from 'src/app/interfaces/boss.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BossService } from 'src/app/services/boss.service';

@Component({
  selector: 'app-bestiary',
  templateUrl: './bestiary.component.html',
  styleUrls: ['./bestiary.component.css']
})
export class BestiaryComponent implements OnInit {
  allBosses: Boss[] = [];
  userBossIds: Set<number> = new Set();
  selectedBoss?: Boss;


  constructor(private userService: AuthService, private bossService: BossService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(profile => {
      this.userBossIds = new Set(profile.bosses.map(b => b.id));

      this.bossService.getAllBosses().subscribe(bosses => {
        this.allBosses = bosses;
      });
    });
  }

  onSelectBoss(boss: Boss): void {
    if (this.hasBoss(boss.id)) {
      this.selectedBoss = boss;
    }
  }


  hasBoss(bossId: number): boolean {
    return this.userBossIds.has(bossId);
  }
}
