import { Component, OnInit } from '@angular/core';
import { Observation } from '../Entity/Observation.Entity';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../Entity/Patient.Entity';

@Component({
  selector: 'app-list-observation',
  templateUrl: './list-observation.component.html',
  styleUrls: ['./list-observation.component.css']
})
export class ListObservationComponent implements OnInit {
  patient: Patient | null = null;
  observations: Observation[] = [];
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
        this.getObservations();
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

  getObservations(): void {
    this.crudService.getObservationsByPatientId(this.patientId).subscribe({
      next: (data) => {
        this.observations = data;
      },
      error: (err) => {
        console.warn('Erreur lors de la récupération des observations :', err);
      }
    });
  }
}
