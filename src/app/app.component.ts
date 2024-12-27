import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedToggle: string = '';
  onToggleChange(event: string) {
    this.selectedToggle = event;
    console.log("appcompoennt", this.selectedToggle);

  }
}
