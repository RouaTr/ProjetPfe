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
 searchDate: string = '';
  filteredObservation: Observation[] = [];
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
  filterByDate(): void {
    if (!this.searchDate) {
      this.filteredObservation = [...this.observations]; // Afficher tout si la recherche est vide
    } else {
      this.filteredObservation = this.observations.filter(symptom => {
        if (symptom.observationDate instanceof Date) {
          const formattedDate = symptom.observationDate.toISOString().split('T')[0];
          return formattedDate === this.searchDate;
        } else {
          console.warn("Valeur inattendue pour observationDate :", symptom.observationDate);
          return false;
        }
      });
    }
  }

  getObservations(): void {
     this.crudService.getObservationsByPatientId(this.patientId).subscribe({
       next: (data) => {
         this.observations = data
           .filter(symptom => symptom.patient?.id === this.patientId)
           .map(symptom => {
             // Vérifier et convertir clinicalSymptomsDate en objet Date
             if (symptom.observationDate) {
               symptom.observationDate = new Date(symptom.observationDate);
             }
             return this.filterSymptoms(symptom);
           })
           .filter(symptom => Object.keys(symptom).length > 1);
         this.filteredObservation = [...this.observations];
         console.log("Signes cliniques filtrés :", this.observations);
       },
       error: (err) => {
         console.warn("Erreur lors de la récupération des signes cliniques :", err);
       }
     });
   }


   private filterSymptoms(symptom: Observation): Observation {
     const filteredSymptom: { [key: string]: any } = {
       id: symptom.id,
       observationDate: symptom.observationDate
     };

     Object.keys(symptom).forEach((key) => {
       const value = (symptom as any)[key];
       if (value !== true && value !== null && value !== undefined && key !== 'id' && key !== 'observationDate' && key !== 'patient') {
         filteredSymptom[key] = value;
       }
     });

     return filteredSymptom as Observation;
   }
}
