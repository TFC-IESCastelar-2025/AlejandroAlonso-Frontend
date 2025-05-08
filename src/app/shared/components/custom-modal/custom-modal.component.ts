import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent {
  @Input() title: string = 'Aviso';
  @Input() message: string = '';
  @Input() buttonText: string = 'Aceptar';

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
