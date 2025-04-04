import { Component } from '@angular/core';
import { MedicalTreatment } from '../Entity/MedicalTreatment.Entity';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-medical-treatment',
  templateUrl: './list-medical-treatment.component.html',
  styleUrls: ['./list-medical-treatment.component.css']
})
export class ListMedicalTreatmentComponent {

 patient: Patient | null = null;
  medicaltreatment: MedicalTreatment[] = [];
  patientId!: number;
 searchDate: string = '';
  filteredMedicalTreatment: MedicalTreatment[] = [];
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
        this.getMedicalTreatment();
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
      this.filteredMedicalTreatment = [...this.medicaltreatment]; // Afficher tout si la recherche est vide
    } else {
      this.filteredMedicalTreatment= this.medicaltreatment.filter(symptom => {
        if (symptom.treatmentRegistrationDate instanceof Date) {
          const formattedDate = symptom.treatmentRegistrationDate.toISOString().split('T')[0];
          return formattedDate === this.searchDate;
        } else {
          console.warn("Valeur inattendue pour treatmentRegistrationDate :", symptom.treatmentRegistrationDate);
          return false;
        }
      });
    }
  }

  getMedicalTreatment(): void {
     this.crudService.getMedicalTreatmentByPatientId(this.patientId).subscribe({
       next: (data) => {
         this.medicaltreatment= data
           .filter(symptom => symptom.patient?.id === this.patientId)
           .map(symptom => {
             // Vérifier et convertir clinicalSymptomsDate en objet Date
             if (symptom.treatmentRegistrationDate) {
               symptom.treatmentRegistrationDate = new Date(symptom.treatmentRegistrationDate);
             }
             return this.filterSymptoms(symptom);
           })
           .filter(symptom => Object.keys(symptom).length > 1);
         this.filteredMedicalTreatment = [...this.medicaltreatment];
         console.log("Signes cliniques filtrés :", this.medicaltreatment);
       },
       error: (err) => {
         console.warn("Erreur lors de la récupération des signes cliniques :", err);
       }
     });
   }


   private filterSymptoms(symptom: MedicalTreatment): MedicalTreatment{
     const filteredSymptom: { [key: string]: any } = {
       id: symptom.treatmentId,
       treatmentRegistrationDate: symptom.treatmentRegistrationDate
     };

     Object.keys(symptom).forEach((key) => {
       const value = (symptom as any)[key];
       if (value !== true && value !== null && value !== undefined && key !== 'id' && key !== 'treatmentRegistrationDate' && key !== 'patient') {
         filteredSymptom[key] = value;
       }
     });

     return filteredSymptom as MedicalTreatment;
   }
}

