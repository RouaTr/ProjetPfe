import { Component } from '@angular/core';
import { MedicalHistory } from '../Entity/MedicalHistory.Entity';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-medical-history',
  templateUrl: './list-medical-history.component.html',
  styleUrls: ['./list-medical-history.component.css']
})
export class ListMedicalHistoryComponent {

  patient: Patient | null = null;
  medicalhistory: MedicalHistory[] = [];
  allergies: MedicalHistory[] = [];
  vaccines: MedicalHistory[] = [];
  medcondtions: MedicalHistory[] = [];
  famhistory: MedicalHistory[] = [];
  stts: MedicalHistory[] = [];
  patientId!: number;

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 🔹 Écoute les changements d'ID du patient
    this.route.paramMap.subscribe(params => {
      const id = params.get('patientId');
      if (id) {
        this.patientId = +id;
        console.log("ID du patient récupéré :", this.patientId);
        this.loadPatientData();
        this.getMedicalHistory();
      } else {
        console.error("Erreur : patientId non récupéré");
      }
    });
  }

  loadPatientData(): void {
    this.crudService.findPatientById(this.patientId).subscribe({
      next: (data) => {
        this.patient = data;
        console.log("Patient récupéré :", this.patient);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération du patient :", err);
      }
    });
  }

  getMedicalHistory(): void {
    this.crudService.getMedicalHistoryByPatientId(this.patientId).subscribe({
      next: (data) => {
        this.medicalhistory = data;

        // Filtrer les antécédants pour l'affichage
        this.allergies = this.medicalhistory.filter(item => item.allergyDiagnosisDate);
        this.vaccines = this.medicalhistory.filter(item => item.vaccineDate);
        this.medcondtions = this.medicalhistory.filter(item => item.medicalDiagnosisDate);
        this.famhistory = this.medicalhistory.filter(item => item.familyDiagnosisDate);
        this.stts = this.medicalhistory.filter(item => item.stiDiagnosisDate);
      },
      error: (err) => {
        console.warn('Erreur lors de la récupération des antécédants :', err);
      }
    });
  }
}
