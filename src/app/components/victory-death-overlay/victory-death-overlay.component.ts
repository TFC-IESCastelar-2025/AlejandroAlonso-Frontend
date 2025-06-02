// src/app/components/victory-death-overlay/victory-death-overlay.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-victory-death-overlay',
  templateUrl: './victory-death-overlay.component.html',
  styleUrls: ['./victory-death-overlay.component.css']
})
export class VictoryDeathOverlayComponent {
  @Input() state: 'victory' | 'death' | null = null;
}
