import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent {
  selectedType: string = '';

  onTypeChange(event: Event) {
    this.selectedType = (event.target as HTMLSelectElement).value;
  }
}

