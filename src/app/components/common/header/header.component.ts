import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  selectedOption = 'health-it';
  @Output() toggleCahnge = new EventEmitter<string>();

  onToggleChange(newValue: string): void {
    console.log(`Toggle changed to: ${newValue}`);
    this.toggleCahnge.emit(newValue);
  }
}
