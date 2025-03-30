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
   searchDate: string = '';
    filteredFunctionalSymptoms: FunctionalSymptoms[] = [];

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
  filterByDate(): void {
    if (!this.searchDate) {
      this.filteredFunctionalSymptoms = [...this.functionalsymptoms]; // Afficher tout si la recherche est vide
    } else {
      this.filteredFunctionalSymptoms = this.functionalsymptoms.filter(symptom => {
        if (symptom.functionalSymptomsDate instanceof Date) {
          const formattedDate = symptom.functionalSymptomsDate.toISOString().split('T')[0];
          return formattedDate === this.searchDate;
        } else {
          console.warn("Valeur inattendue pour functionalSymptomsDate :", symptom.functionalSymptomsDate);
          return false;
        }
      });
    }
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
        this.functionalsymptoms = data
          .filter(symptom => symptom.patient?.id === this.patientId)
          .map(symptom => {
            // Vérifier et convertir clinicalSymptomsDate en objet Date
            if (symptom.functionalSymptomsDate) {
              symptom.functionalSymptomsDate = new Date(symptom.functionalSymptomsDate);
            }
            return this.filterSymptoms(symptom);
          })
          .filter(symptom => Object.keys(symptom).length > 1);
        this.filteredFunctionalSymptoms = [...this.functionalsymptoms];
        console.log("Signes cliniques filtrés :", this.functionalsymptoms);
      },
      error: (err) => {
        console.warn("Erreur lors de la récupération des signes cliniques :", err);
      }
    });
  }
  private filterSymptoms(symptom: FunctionalSymptoms): FunctionalSymptoms {
      const filteredSymptom: { [key: string]: any } = {
        id: symptom.id,
        functionalSymptomsDate: symptom.functionalSymptomsDate
      };

      Object.keys(symptom).forEach((key) => {
        const value = (symptom as any)[key];
        if (value !== true && value !== null && value !== undefined && key !== 'id' && key !== 'functionalSymptomsDate' && key !== 'patient') {
          filteredSymptom[key] = value;
        }
      });

      return filteredSymptom as FunctionalSymptoms;
    }
  formatValue(value: boolean): string {
    return value ? 'Oui' : 'Non';
  }
}
