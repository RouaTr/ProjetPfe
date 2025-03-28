import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { MedicalHistory } from '../Entity/MedicalHistory.Entity';
import { Patient } from '../Entity/Patient.Entity';

@Component({
  selector: 'app-update-medical-history',
  templateUrl: './update-medical-history.component.html',
  styleUrls: ['./update-medical-history.component.css']
})
export class UpdateMedicalHistoryComponent {
  selectedType: string = '';

 messageCommande = "";
  updateForm: FormGroup;
id!: number;
  currentMedicalHistory!: MedicalHistory;
  public message!: string;
  patientId?: number; // Doit être bien défini dans la classe
  patient: Patient | null = null;
 constructor(private service: CrudService, private router: Router,private route: ActivatedRoute, private fb: FormBuilder) {
     this.updateForm = this.fb.group({
       historyType: new FormControl('', [Validators.required]),
       vaccineCode: [''],
       vaccineType: [''],
       vaccineBatchNumber: [''],
       vaccineStatus: [''],
       vaccineDate: [''],
       allergyDiagnosisDate: [''],
       allergyType: [''],
       allergyReaction: [''],
       allergyMedication: [''],
       allergyStatus: [''],
       medicalCondition: [''],
       medicalDiagnosisDate: [''],
       medicalTreatment: [''],
       medicalTreatmentStartDate: [''],
       medicalTreatmentEndDate: [''],
       medicalFollowUp: [''],
       medicalStatus: [''],
       hereditaryDisease: [''],
       affectedFamilyMember: [''],
       familyDiagnosisDate: [''],
       familyStatus: [''],
       stiType: [''],
       stiDiagnosisDate: [''],
       stiTreatment: [''],
       stiTreatmentStartDate: [''],
       stiTreatmentEndDate: [''],
       stiFollowUp: [''],
       stiStatus: [''],
     });
   }
   onTypeChange(selectedType: string) {
    this.selectedType = selectedType;
    this.updateForm.patchValue({ historyType: selectedType });
    this.updateFormValidators();
  }

  updateFormValidators() {
    const controls = this.updateForm.controls;

    if (this.selectedType === 'vaccin') {
      controls['vaccineCode'].setValidators([Validators.required]);
      controls['vaccineType'].setValidators([Validators.required]);
      controls['vaccineDate'].setValidators([Validators.required]);
    } else {
      controls['vaccineCode'].clearValidators();
      controls['vaccineType'].clearValidators();
      controls['vaccineDate'].clearValidators();
    }

    if (this.selectedType === 'allergie') {
      controls['allergyDiagnosisDate'].setValidators([Validators.required]);
      controls['allergyType'].setValidators([Validators.required]);
    } else {
      controls['allergyDiagnosisDate'].clearValidators();
      controls['allergyType'].clearValidators();
    }

    if (this.selectedType === 'medicaux') {
      controls['medicalDiagnosisDate'].setValidators([Validators.required]);
      controls['medicalTreatment'].setValidators([Validators.required]);
      controls['medicalTreatmentStartDate'].setValidators([Validators.required]);
    } else {
      controls['medicalDiagnosisDate'].clearValidators();
      controls['medicalTreatment'].clearValidators();
      controls['medicalTreatmentStartDate'].clearValidators();
    }

    if (this.selectedType === 'familiaux') {
      controls['hereditaryDisease'].setValidators([Validators.required]);
      controls['familyDiagnosisDate'].setValidators([Validators.required]);
    } else {
      controls['hereditaryDisease'].clearValidators();
      controls['familyDiagnosisDate'].clearValidators();
    }
    if (this.selectedType === 'ist') {
      controls['stiType'].setValidators([Validators.required]);
      controls['stiTreatment'].setValidators([Validators.required]);
      controls['stiDiagnosisDate'].setValidators([Validators.required]);
    } else {
      controls['stiType'].clearValidators();
      controls['stiTreatment'].clearValidators();
      controls['stiDiagnosisDate'].clearValidators();
    }

    Object.values(controls).forEach(control => control.updateValueAndValidity());
  }

  get vaccineDate() { return this.updateForm.get('vaccineDate'); }
  get vaccineCode() { return this.updateForm.get('vaccineCode'); }
  get vaccineType() { return this.updateForm.get('vaccineType'); }
  get allergyDiagnosisDate() { return this.updateForm.get('allergyDiagnosisDate'); }

  get allergyType() { return this.updateForm.get('allergyType'); }

  get medicalDiagnosisDate() { return this.updateForm.get('medicalDiagnosisDate'); }

  get medicalTreatment() { return this.updateForm.get('medicalTreatment'); }
  get medicalTreatmentStartDate() { return this.updateForm.get('medicalTreatmentStartDate'); }
  get hereditaryDisease() { return this.updateForm.get('hereditaryDisease'); }
  get familyDiagnosisDate() { return this.updateForm.get('familyDiagnosisDate'); }
  get stiType() { return this.updateForm.get('stiType'); }
  get stiTreatment() { return this.updateForm.get('stiTreatment'); }
  get stiDiagnosisDate() { return this.updateForm.get('stiDiagnosisDate'); }


  ngOnInit(): void {
      this.id = Number(this.route.snapshot.params['id']);

      this.service.findMedicalHistoryById(this.id).subscribe((medicalhistory) => {
        console.log("🔹 Antécédants récupérée depuis l'API :", medicalhistory);

        if (!medicalhistory || !medicalhistory.patient) {
          console.error("⚠️ Erreur : Antécédant ou le patient est null !");
          return;
        }
        this.patient = medicalhistory.patient;

        this.currentMedicalHistory = medicalhistory;

        this.updateForm.patchValue({
          historyType: medicalhistory.historyType,
          vaccineCode: medicalhistory.vaccineCode,
          vaccineType: medicalhistory.vaccineType,
          vaccineBatchNumber: medicalhistory.vaccineBatchNumber,
          vaccineStatus: medicalhistory.vaccineStatus,
          vaccineDate: medicalhistory.vaccineDate,
          allergyDiagnosisDate: medicalhistory.allergyDiagnosisDate,
          allergyType: medicalhistory.allergyType,
          allergyReaction: medicalhistory.allergyReaction,
          allergyMedication: medicalhistory.allergyMedication,
          allergyStatus: medicalhistory.allergyStatus,
          medicalCondition: medicalhistory.medicalCondition,
          medicalDiagnosisDate: medicalhistory.medicalDiagnosisDate,
          medicalTreatment: medicalhistory.medicalTreatment,
          medicalTreatmentStartDate: medicalhistory.medicalTreatmentStartDate,
          medicalTreatmentEndDate: medicalhistory.medicalTreatmentEndDate,
          medicalFollowUp: medicalhistory.medicalFollowUp,
          medicalStatus: medicalhistory.medicalStatus,
          hereditaryDisease: medicalhistory.hereditaryDisease,
          affectedFamilyMember: medicalhistory.affectedFamilyMember,
          familyDiagnosisDate: medicalhistory.familyDiagnosisDate,
          familyStatus: medicalhistory.familyStatus,
          stiType: medicalhistory.stiType,
          stiDiagnosisDate: medicalhistory.stiDiagnosisDate,
          stiTreatment: medicalhistory.stiTreatment,
          stiTreatmentStartDate: medicalhistory.stiTreatmentStartDate,
          stiTreatmentEndDate: medicalhistory.stiTreatmentEndDate,
          stiFollowUp: medicalhistory.stiFollowUp,
          stiStatus: medicalhistory.stiStatus
        });

        console.log("🔹 Patient récupéré :", this.currentMedicalHistory.patient);
      });
    }

    logInvalidFields() {
      console.log("❌ Champs invalides dans le formulaire :");
      Object.keys(this.updateForm.controls).forEach(key => {
        const control = this.updateForm.get(key);
        if (control?.invalid) {
          console.log(` Champ : ${key}`);
          console.log("   ↳ Erreurs :", control.errors);
        }
      });
    }

    updateMedicalHistory() {
      this.updateForm.markAllAsTouched();
      if (this.updateForm.invalid) {
        console.log("🚨 Formulaire invalide !");
        this.logInvalidFields();
        return;
      }

      if (!this.currentMedicalHistory?.patient) {
        console.error("🚨 Erreur : patient est undefined !");
        return;
      }

      this.patientId = this.currentMedicalHistory.patient.id; // ✅ Récupération correcte de l'ID du patient

      let data = this.updateForm.value;
      let medicalhistory = new MedicalHistory();
      Object.assign(medicalhistory, data);
      medicalhistory.id = this.id;
      medicalhistory.patient = this.currentMedicalHistory.patient;

      console.log("🔄 Données envoyées pour mise à jour :", medicalhistory);

      this.service.updateMedicalHistory(this.id, this.patientId, medicalhistory).subscribe({
        next: (res) => {
          console.log("✅ antécédant mis à jour avec succès :", res);
          this.router.navigate(['/medicalfolder/listmedicalhistory', this.patientId]);
        },
        error: (err) => {
          console.error("⚠️ Erreur lors de la mise à jour :", err);
        }
      });
    }

  }
