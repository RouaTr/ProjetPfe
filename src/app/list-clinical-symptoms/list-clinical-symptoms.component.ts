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
          .map(symptom => this.filterSymptoms(symptom))
          .filter(symptom => Object.keys(symptom).length > 1);

        console.log("Signes fonctionnels du patient (filtrés) :", this.clinicalsymptoms);
      },
      error: (err) => {
        console.warn("Erreur lors de la récupération des signes fonctionnels :", err);
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

