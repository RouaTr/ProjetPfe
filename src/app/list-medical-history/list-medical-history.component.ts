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
   searchDate: string = '';
  filteredMedicalHistory: MedicalHistory[] = [];
  [key: string]: any;

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
        this.medicalhistory = data
          .filter(symptom => symptom.patient?.id === this.patientId)
          .map(symptom => {
            // Vérifier et convertir chaque date en objet Date
            ['vaccineDate', 'allergyDiagnosisDate', 'medicalDiagnosisDate', 'familyDiagnosisDate', 'stiDiagnosisDate'].forEach(dateField => {
              if (symptom[dateField]) {
                symptom[dateField] = new Date(symptom[dateField]);
              }
            });
            return this.filterSymptoms(symptom);  // Filtrer les symptômes
          })
          .filter(symptom => Object.keys(symptom).length > 1);  // Filtrer les objets vides
        this.filteredMedicalHistory = [...this.medicalhistory];
        console.log("Signes cliniques filtrés :", this.medicalhistory);
      },
      error: (err) => {
        console.warn("Erreur lors de la récupération des signes cliniques :", err);
      }
    });
  }

  private filterSymptoms(symptom: MedicalHistory): { [key: string]: any } {
    const filteredSymptom: { [key: string]: any } = {
      id: symptom.id
    };

    // Liste des clés autorisées
    const allowedKeys: (keyof MedicalHistory)[] = [
      'vaccineDate',
      'allergyDiagnosisDate',
      'medicalDiagnosisDate',
      'familyDiagnosisDate',
      'stiDiagnosisDate'
    ];

    allowedKeys.forEach((dateField) => {
      if (symptom[dateField]) {
        filteredSymptom[dateField] = symptom[dateField];
      }
    });

    // Filtrer les autres propriétés dynamiques (en vérifiant les types)
    Object.keys(symptom).forEach((key) => {
      const value = symptom[key];
      if (value !== true && value !== null && value !== undefined && !['id', 'patient'].includes(key)) {
        filteredSymptom[key] = value;
      }
    });

    return filteredSymptom;
  }


  filterByDate(): void {
    if (!this.searchDate) {
      this.filteredMedicalHistory = [...this.medicalhistory];  // Afficher tout si la recherche est vide
    } else {
      this.filteredMedicalHistory = this.medicalhistory.filter(medicalhistory => {
        const dateFields: (keyof MedicalHistory)[] = [
          'vaccineDate',
          'allergyDiagnosisDate',
          'medicalDiagnosisDate',
          'familyDiagnosisDate',
          'stiDiagnosisDate'
        ];

        return dateFields.some(dateField => {
          const date = medicalhistory[dateField];
          if (date instanceof Date) {
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate === this.searchDate;
          } else {
            console.warn(`Valeur inattendue pour ${dateField} :`, date);
            return false;
          }
        });
      });
    }
  }

  }

