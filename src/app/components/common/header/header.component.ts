import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  selectedOption = 'health-it';
  
  constructor(private common:CommonService){}

  onToggleChange(newValue: string): void {
    this.common.behaviourSubject.next(newValue);
  }
}
