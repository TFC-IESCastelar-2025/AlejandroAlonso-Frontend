import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Boss } from 'src/app/interfaces/boss.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BossService } from 'src/app/services/boss.service';

declare var bootstrap: any;

@Component({
  selector: 'app-bestiary',
  templateUrl: './bestiary.component.html',
  styleUrls: ['./bestiary.component.css']
})
export class BestiaryComponent implements OnInit, AfterViewInit {
  allBosses: Boss[] = [];
  userBossIds: Set<number> = new Set();
  selectedBoss?: Boss;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  modal: any;

  constructor(private userService: AuthService, private bossService: BossService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(profile => {
      this.userBossIds = new Set(profile.bosses.map(b => b.id));

      this.bossService.getAllBosses().subscribe(bosses => {
        this.allBosses = bosses;
      });
    });
  }

  ngAfterViewInit(): void {
    const modalEl = document.getElementById('bossDetailModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl, {
        backdrop: 'static',
        keyboard: true,
      });
    }
  }

  onSelectBoss(boss: Boss): void {
    if (this.hasBoss(boss.id)) {
      this.selectedBoss = boss;
    }
  }

  openModalOnMobile(): void {
    if (window.innerWidth <= 767 && this.modal && this.selectedBoss) {
      this.modal.show();
    }
  }

  hasBoss(bossId: number): boolean {
    return this.userBossIds.has(bossId);
  }

  get paginatedBosses(): Boss[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.allBosses.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.selectedBoss = undefined;
  }
}