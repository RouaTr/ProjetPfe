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
      medicalRecordNumber:new FormControl('', [Validators.required]),
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
      age_at_HIV_diagnosis: new FormControl('', [Validators.required]),
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
  get age_at_HIV_diagnosis(): FormControl {
    return this.PatientForm.get('age_at_HIV_diagnosis') as FormControl;
  }
  get medicalRecordNumber(): FormControl {
    return this.PatientForm.get('medicalRecordNumber') as FormControl;
  }
  isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
    return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);

  }



  addNewPatient() {
    this.PatientForm.markAllAsTouched();
    if (this.PatientForm.invalid) {
      console.log("🚨 Formulaire invalide !");
      this.logInvalidFields();
      return;
    }

    let data = this.PatientForm.value;
    let lastName = data.lastName;
    let firstName = data.firstName;

    // Vérifier si le patient existe déjà
    this.crudService.doesPatientExists(lastName, firstName).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.messageCommande = " Le patient existe déjà !";
          console.log(this.messageCommande);
          return;
        }

        // Création et ajout du patient
        let patient = new Patient(undefined, data.medicalRecordNumber, lastName, firstName, data.birthDate, data.gender,
          data.phoneNumber, data.city, data.region, data.postalCode,
          data.address, data.nationality, data.weight, data.height,
          data.maritalStatus, data.children, data.housing, data.housingType,
          data.educationLevel, data.smoking, data.alcohol, data.drugUse,
          data.physicalActivity, data.bodyTemperature, data.heartRate,
          data.bloodPressure, data.contaminationMode, data.initialScreeningType,
          data.initialScreeningReason, data.lastNegativeDate, data.positiveHIVDate,
          data.hlaB5701Typing, data.screeningCircumstance, data.viralType, data.age_at_HIV_diagnosis,
          data.contaminationDate, data.cdcStage
        );

        const practitionnerEmail = localStorage.getItem("practitionnerEmail");

        if (practitionnerEmail) {
          this.crudService.addPatient(patient, practitionnerEmail).subscribe(
            res => {
              console.log("Patient ajouté avec succès :", res);
              this.messageCommande = " Patient ajouté avec succès !";

              if (res && res.id) {
                localStorage.setItem('selectedPatientId', res.id.toString());
              }

              // Optionally, navigate to another page
              // this.router.navigate(['/patients']);
            },
            err => {
              console.log("Erreur serveur :", err);
              this.messageCommande = "Problème de serveur !";
            }
          );
        } else {
          console.log("Erreur : L'email du praticien n'est pas disponible.");
        }
      },
      err => {
        console.log("Erreur lors de la vérification du patient :", err);
        this.messageCommande = "Problème lors de la vérification du patient !";
      }
    );
  }



  logInvalidFields() {
    console.log(" Champs invalides dans le formulaire :");

    Object.keys(this.PatientForm.controls).forEach(key => {
      const control = this.PatientForm.get(key);
      if (control?.invalid) {
        console.log(` Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }

  ngOnInit(): void {}
}
