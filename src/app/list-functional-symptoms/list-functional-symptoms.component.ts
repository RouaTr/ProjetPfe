import { Component, OnInit } from '@angular/core';
import { FunctionalSymptoms } from '../Entity/FunctionalSymptoms.Entity';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-functional-symptoms',
  templateUrl: './list-functional-symptoms.component.html',
  styleUrls: ['./list-functional-symptoms.component.css']
})
export class ListFunctionalSymptomsComponent implements OnInit {
  patient: Patient | null = null;
  functionalsymptoms: FunctionalSymptoms[] = [];
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
        this.getFunctionalSymptoms();
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

  getFunctionalSymptoms(): void {
    this.crudService.getFunctionalSymptomsByPatientId(this.patientId).subscribe({
      next: (data) => {
        this.functionalsymptoms = data.filter(symptom => symptom.patient?.id === this.patientId);
        console.log("Signes fonctionnels du patient :", this.functionalsymptoms);
      },
      error: (err) => {
        console.warn("Erreur lors de la récupération des signes fonctionnels :", err);
      }
    });
  }

  formatValue(value: boolean): string {
    return value ? 'Oui' : 'Non';
  }
}
