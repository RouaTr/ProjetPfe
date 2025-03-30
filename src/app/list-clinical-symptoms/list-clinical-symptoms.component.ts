import { Component } from '@angular/core';
import { ClinicalSymptoms } from '../Entity/ClinicalSymptoms.Entity';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-clinical-symptoms',
  templateUrl: './list-clinical-symptoms.component.html',
  styleUrls: ['./list-clinical-symptoms.component.css']
})
export class ListClinicalSymptomsComponent {
  patient: Patient | null = null;
  clinicalsymptoms: ClinicalSymptoms[] = [];
  patientId!: number;
  searchDate: string = '';
  filteredClinicalSymptoms: ClinicalSymptoms[] = []; // Liste filtrée


  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute, private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('patientId');
      if (id) {
        this.patientId = +id;
        console.log("ID du patient récupéré :", this.patientId);
        this.loadPatientData();
        this.getClinicalSymptoms();
      } else {
        console.error("Erreur : patientId non récupéré");
      }
    });
  }
  filterByDate(): void {
    if (!this.searchDate) {
      this.filteredClinicalSymptoms = [...this.clinicalsymptoms]; // Afficher tout si la recherche est vide
    } else {
      this.filteredClinicalSymptoms = this.clinicalsymptoms.filter(symptom => {
        if (symptom.clinicalSymptomsDate instanceof Date) {
          const formattedDate = symptom.clinicalSymptomsDate.toISOString().split('T')[0];
          return formattedDate === this.searchDate;
        } else {
          console.warn("Valeur inattendue pour clinicalSymptomsDate :", symptom.clinicalSymptomsDate);
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

  getClinicalSymptoms(): void {
    this.crudService.getClinicalSymptomsByPatientId(this.patientId).subscribe({
      next: (data) => {
        this.clinicalsymptoms = data
          .filter(symptom => symptom.patient?.id === this.patientId)
          .map(symptom => {
            // Vérifier et convertir clinicalSymptomsDate en objet Date
            if (symptom.clinicalSymptomsDate) {
              symptom.clinicalSymptomsDate = new Date(symptom.clinicalSymptomsDate);
            }
            return this.filterSymptoms(symptom);
          })
          .filter(symptom => Object.keys(symptom).length > 1);
        this.filteredClinicalSymptoms = [...this.clinicalsymptoms];
        console.log("Signes cliniques filtrés :", this.clinicalsymptoms);
      },
      error: (err) => {
        console.warn("Erreur lors de la récupération des signes cliniques :", err);
      }
    });
  }


  private filterSymptoms(symptom: ClinicalSymptoms): ClinicalSymptoms {
    const filteredSymptom: { [key: string]: any } = {
      id: symptom.id,
      clinicalSymptomsDate: symptom.clinicalSymptomsDate
    };

    Object.keys(symptom).forEach((key) => {
      const value = (symptom as any)[key];
      if (value !== true && value !== null && value !== undefined && key !== 'id' && key !== 'clinicalSymptomsDate' && key !== 'patient') {
        filteredSymptom[key] = value;
      }
    });

    return filteredSymptom as ClinicalSymptoms;
  }

    updateClinicalSymptoms(symptomId: number) {
      this.router.navigate(['/medicalfolder/listclinicalsymptoms/updateclinicalsymptoms', symptomId]);
    }


  }

