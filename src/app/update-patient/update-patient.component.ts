import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../Entity/Patient.Entity';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  updateForm: FormGroup;
  id!: number;
  currentPatient = new Patient();
  userFile: any;
  public message!: string;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,  // Router pour la navigation
    private route: ActivatedRoute  // ActivatedRoute pour récupérer l'ID
  ) {
    this.updateForm = this.fb.group({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]),age_at_HIV_diagnosis: new FormControl('', [Validators.required]),
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
    });
  }
  get lastNameControl(): FormControl {
    return this.updateForm.get('lastName') as FormControl;
  }
  get firstNameControl(): FormControl {
    return this.updateForm.get('firstName') as FormControl;
  }
  get birthDateControl(): FormControl {
    return this.updateForm.get('birthDate') as FormControl;
  }
  get cityControl(): FormControl {
    return this.updateForm.get('city') as FormControl;
  }
  get postalCodeControl(): FormControl {
    return this.updateForm.get('postalCode') as FormControl;
  }
  get phoneNumberControl(): FormControl {
    return this.updateForm.get('phoneNumber') as FormControl;
  }
  get age_at_HIV_diagnosis(): FormControl {
    return this.updateForm.get('age_at_HIV_diagnosis') as FormControl;
  }

   isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
      return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);

    }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.service.findPatientById(this.id).subscribe((patient) => {
      console.log(patient);

      this.updateForm.patchValue({
        lastName: patient.lastName,
        firstName: patient.firstName,
        birthDate: patient.birthDate,
        gender: patient.gender,
        phoneNumber: patient.phoneNumber,
        age_at_HIV_diagnosis:patient.age_at_HIV_diagnosis,
        city: patient.city,
        region: patient.region,
        postalCode: patient.postalCode,
        address: patient.address,
        nationality: patient.nationality,
        weight: patient.weight,
        height: patient.height,
        maritalStatus: patient.maritalStatus,
        children: patient.children,
        housing: patient.housing,
        housingType: patient.housingType,
        educationLevel: patient.educationLevel,
        smoking: patient.smoking,
        alcohol: patient.alcohol,
        drugUse: patient.drugUse,
        physicalActivity: patient.physicalActivity,
        bodyTemperature: patient.bodyTemperature,
        heartRate: patient.heartRate,
        bloodPressure: patient.bloodPressure,
        contaminationMode: patient.contaminationMode,
        initialScreeningType: patient.initialScreeningType,
        initialScreeningReason: patient.initialScreeningReason,
        lastNegativeDate: patient.lastNegativeDate,
        positiveHIVDate: patient.positiveHIVDate,
        hlaB5701Typing: patient.hlaB5701Typing,
        screeningCircumstance: patient.screeningCircumstance,
        viralType: patient.viralType,
        contaminationDate: patient.contaminationDate,
        cdcStage: patient.cdcStage
      });
    });
  }
  logInvalidFields() {
    console.log("🔴 Champs invalides dans le formulaire :");

    Object.keys(this.updateForm.controls).forEach(key => {
      const control = this.updateForm.get(key);
      if (control?.invalid) {
        console.log(`❌ Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }
  updatePatient() {
    this.updateForm.markAllAsTouched();

    if (this.updateForm.invalid) {
      console.log("🚨 Formulaire invalide !");
      this.logInvalidFields(); // 🔍 Afficher les erreurs des champs invalides
      return;
    }

    let data = this.updateForm.value;
    let patient = new Patient();
    Object.assign(patient, data);
    patient.id = this.id;

    // Récupération de l'email du praticien depuis localStorage
    const practitionnerEmail = localStorage.getItem("practitionnerEmail");

    if (practitionnerEmail) {
      // Si le patient a un praticien associé, on lui attribue l'email du praticien
      if (!patient.practitionner) {
        patient.practitionner = { practitionnerEmail }; // Si le praticien n'existe pas, on crée un objet avec l'email
      } else {
        patient.practitionner.practitionnerEmail = practitionnerEmail;  // Sinon, on met à jour l'email du praticien
      }

      // Appel à la méthode updatePatient du service pour mettre à jour le patient
      this.service.updatePatient(this.id, patient, practitionnerEmail).subscribe(
        (res) => {
          console.log("Patient mis à jour avec succès", res);
          this.router.navigate(['/medicalfolder', this.id]);
        },
        (err) => {
          console.log("Erreur lors de la mise à jour du patient", err);
        }
      );
    } else {
      console.log("Erreur : L'email du praticien n'est pas disponible.");
    }
  }



}
