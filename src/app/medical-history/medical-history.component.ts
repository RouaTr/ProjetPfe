import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent {
  selectedType: string = '';
  messageCommande = "";
  MedicalHistoryForm: FormGroup;
  patientId: number | null = null;

  constructor(private service: CrudService, private router: Router, private fb: FormBuilder) {
    this.MedicalHistoryForm = this.fb.group({
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
    this.MedicalHistoryForm.patchValue({ historyType: selectedType });
    this.updateFormValidators();
  }

  updateFormValidators() {
    const controls = this.MedicalHistoryForm.controls;

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
  get vaccineDate() { return this.MedicalHistoryForm.get('vaccineDate'); }
  get vaccineCode() { return this.MedicalHistoryForm.get('vaccineCode'); }
  get vaccineType() { return this.MedicalHistoryForm.get('vaccineType'); }
  get allergyDiagnosisDate() { return this.MedicalHistoryForm.get('allergyDiagnosisDate'); }

  get allergyType() { return this.MedicalHistoryForm.get('allergyType'); }

  get medicalDiagnosisDate() { return this.MedicalHistoryForm.get('medicalDiagnosisDate'); }

  get medicalTreatment() { return this.MedicalHistoryForm.get('medicalTreatment'); }
  get medicalTreatmentStartDate() { return this.MedicalHistoryForm.get('medicalTreatmentStartDate'); }
  get hereditaryDisease() { return this.MedicalHistoryForm.get('hereditaryDisease'); }
  get familyDiagnosisDate() { return this.MedicalHistoryForm.get('familyDiagnosisDate'); }
  get stiType() { return this.MedicalHistoryForm.get('stiType'); }
  get stiTreatment() { return this.MedicalHistoryForm.get('stiTreatment'); }
  get stiDiagnosisDate() { return this.MedicalHistoryForm.get('stiDiagnosisDate'); }



  ngOnInit(): void {
    const storedId = localStorage.getItem('selectedPatientId');
    if (storedId) {
      this.patientId = parseInt(storedId, 10);
      console.log("🔹 ID du patient récupéré :", this.patientId);
    } else {
      console.error("⚠️ Aucun patient sélectionné !");
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Impossible d'ajouter l'antécédent: aucun patient sélectionné.
      </div>`;
    }
  }

  addNewMedicalHistory() {
    if (!this.patientId) {
      console.error("Erreur : Aucun ID patient récupéré !");
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Impossible d'ajouter l'antécédent: aucun patient enregistré.
      </div>`;
      return;
    }

    if (this.MedicalHistoryForm.invalid) {
      console.error("Erreur : Formulaire invalide !");
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Veuillez remplir tous les champs obligatoires.
      </div>`;
      return;
    }

    let data = { ...this.MedicalHistoryForm.value, patientId: this.patientId };

    this.service.addMedicalHistory(this.patientId, data).subscribe(
      res => {
        console.log('Réponse du serveur:', res);
        this.messageCommande = `<div class="alert alert-success" role="alert">
          Antécédent ajouté avec succès !
        </div>`;
        this.router.navigate([`/medicalfolder/listmedicalhistory/${this.patientId}`]);
      },
      err => {
        console.error('Erreur:', err);
        this.messageCommande = `<div class="alert alert-danger" role="alert">
          Problème de serveur ou données invalides !
        </div>`;
      }
    );
  }
}
