import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Patient } from '../Entity/Patient.Entity';

@Component({
  selector: 'app-medical-folder',
  templateUrl: './medical-folder.component.html',
  styleUrls: ['./medical-folder.component.css']
})
export class MedicalFolderComponent implements OnInit {
  patient!: Patient;

  constructor(private route: ActivatedRoute, private crudService: CrudService ,private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const patientId = Number(id);
      this.loadPatientData(patientId);
    }
  }

  loadPatientData(id: number) {
    this.crudService.findPatientById(id).subscribe(patient => {
      this.patient = patient;
      console.log("Données du patient récupérées :", patient);
    });
  }

  updatePatient() {
    this.router.navigate(['/updatePatient', this.patient.id]);
  }
}
