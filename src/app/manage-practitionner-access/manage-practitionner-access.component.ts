import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-manage-practitionner-access',
  templateUrl: './manage-practitionner-access.component.html',
  styleUrls: ['./manage-practitionner-access.component.css']
})
export class ManagePractitionnerAccessComponent {
  pendingPractitionners: any[] = [];

  constructor(private service: CrudService) {}

  ngOnInit() {
    this.loadPendingPractitionners();
  }

  loadPendingPractitionners() {
    this.service.getPendingPractitionners().subscribe(data => {
      this.pendingPractitionners = data;
    });
  }

  validatePractitionner(id: number, role: string) {
    console.log(`Validating practitioner ${id} with role ${role}`);
    this.service.validatePractitionner(id, role).subscribe(() => {
      alert('Praticien validé et rôle attribué !');
      this.loadPendingPractitionners(); // Recharge la liste
      console.log('Liste des praticiens mise à jour', this.pendingPractitionners);
    });
  }

  }
