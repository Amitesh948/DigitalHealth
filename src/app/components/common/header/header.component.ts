import { Component, effect } from '@angular/core';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  selectedOption = 'health-it';
  marginLeft = 300
  
  constructor(private common:CommonService){
    effect(() => {
      if(common.headerToggleButtonSignal() == 'Comparative'){
        this.marginLeft = 1100;
      }
    })
  }

  onToggleChange(newValue: string): void {
    this.common.changeToggleButton.set(newValue);
  }
}
