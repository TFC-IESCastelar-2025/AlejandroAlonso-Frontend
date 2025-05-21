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

  @Input() showCheckbox: boolean = false; 
  dontShowAgain: boolean = false; 

  @Output() close = new EventEmitter<boolean>();
  @Output() dontRemind = new EventEmitter<boolean>();

  onClose(shouldRedirect: boolean = false): void {
    this.dontRemind.emit(this.dontShowAgain);
    this.close.emit(shouldRedirect);
  }
}
