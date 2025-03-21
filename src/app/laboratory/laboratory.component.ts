import { Component } from '@angular/core';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent {
  selectedType: string = '';

  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedType = target.value;
  }
}

