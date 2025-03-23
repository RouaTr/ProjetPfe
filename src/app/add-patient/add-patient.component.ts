import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../Entity/Patient.Entity';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  messageCommande = "";
  PatientForm: FormGroup;

  constructor(private crudService: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]],
      city: new FormControl('', [Validators.required]),
      region: new FormControl(''),
      postalCode: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      nationality: new FormControl(''),
      weight: new FormControl(''),
      height: new FormControl(''),
      maritalStatus: new FormControl(''),
      children: new FormControl(''),
      housing: new FormControl(''),
      housingType: new FormControl(''),
      educationLevel: new FormControl(''),
      smoking: new FormControl(''),
      alcohol: new FormControl(''),
      drugUse: new FormControl(''),
      physicalActivity: new FormControl(''),
      bodyTemperature: new FormControl(''),
      heartRate: new FormControl(''),
      bloodPressure: new FormControl(''),
      contaminationMode: new FormControl(''),
      initialScreeningType: new FormControl(''),
      initialScreeningReason: new FormControl(''),
      lastNegativeDate: new FormControl(''),
      positiveHIVDate: new FormControl(''),
      hlaB5701Typing: new FormControl(''),
      screeningCircumstance: new FormControl(''),
      viralType: new FormControl(''),
      contaminationDate: new FormControl(''),
      cdcStage: new FormControl('')
    }
  

    this.PatientForm = this.fb.group(formControls);

  }
  get lastNameControl(): FormControl {
    return this.PatientForm.get('lastName') as FormControl;
  }
  get firstNameControl(): FormControl {
    return this.PatientForm.get('firstName') as FormControl;
  }
  get birthDateControl(): FormControl {
    return this.PatientForm.get('birthDate') as FormControl;
  }
  get cityControl(): FormControl {
    return this.PatientForm.get('city') as FormControl;
  }
  get postalCodeControl(): FormControl {
    return this.PatientForm.get('postalCode') as FormControl;
  }
  get phoneNumberControl(): FormControl {
    return this.PatientForm.get('phoneNumber') as FormControl;
  }
  isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
    return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);

  }

  logInvalidFields() {
    console.log("🔴 Champs invalides dans le formulaire :");

    Object.keys(this.PatientForm.controls).forEach(key => {
      const control = this.PatientForm.get(key);
      if (control?.invalid) {
        console.log(`❌ Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }

  addNewPatient() {
    this.PatientForm.markAllAsTouched();
    if (this.PatientForm.invalid) {
      console.log("🚨 Formulaire invalide !");
      this.logInvalidFields(); // 🔍 Afficher les erreurs des champs invalides
      return;
    }
    console.log("Valeurs du formulaire :", this.PatientForm.value);
    console.log("Formulaire valide ?", this.PatientForm.valid);



    let data = this.PatientForm.value;
    console.log("✅ Formulaire valide :", data);

    let patient = new Patient(undefined,
      data.lastName, data.firstName, data.birthDate, data.gender,
      data.phoneNumber, data.city, data.region, data.postalCode,
      data.address, data.nationality, data.weight, data.height,
      data.maritalStatus, data.children, data.housing, data.housingType,
      data.educationLevel, data.smoking, data.alcohol, data.drugUse,
      data.physicalActivity, data.bodyTemperature, data.heartRate,
      data.bloodPressure, data.contaminationMode, data.initialScreeningType,
      data.initialScreeningReason, data.lastNegativeDate, data.positiveHIVDate,
      data.hlaB5701Typing, data.screeningCircumstance, data.viralType,
      data.contaminationDate, data.cdcStage
    );

    this.crudService.addPatient(patient).subscribe(
      res => {
        console.log("✅ Patient ajouté avec succès :", res);
        this.messageCommande = "Patient ajouté avec succès !";
        setTimeout(() => {
          this.router.navigate(['/listpatient']);
        }, 2000);
      },
      err => {
        console.log("❌ Erreur serveur :", err);
        this.messageCommande = "Problème de serveur !";
      }
    );
  }



  ngOnInit(): void {}
}
