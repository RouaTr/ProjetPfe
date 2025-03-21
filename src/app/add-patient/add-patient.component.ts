import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private service: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
      city: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required, Validators.min(1)]),
      height: new FormControl('', [Validators.required, Validators.min(1)]),
      maritalStatus: new FormControl('', [Validators.required]),
      children: new FormControl('', [Validators.required, Validators.min(0)]),
      housing: new FormControl('', [Validators.required]),
      housingType: new FormControl('', [Validators.required]),
      educationLevel: new FormControl('', [Validators.required]),
      smoking: new FormControl('', [Validators.required]),
      alcohol: new FormControl('', [Validators.required]),
      drugUse: new FormControl('', [Validators.required]),
      physicalActivity: new FormControl('', [Validators.required]),
      bodyTemperature: new FormControl('', [Validators.required]),
      heartRate: new FormControl('', [Validators.required]),
      bloodPressure: new FormControl('', [Validators.required]),
      contaminationMode: new FormControl('', [Validators.required]),
      initialScreeningType: new FormControl('', [Validators.required]),
      initialScreeningReason: new FormControl('', [Validators.required]),
      lastNegativeDate: new FormControl('', [Validators.required]),
      positiveHIVDate: new FormControl('', [Validators.required]),
      hlaB5701Typing: new FormControl('', [Validators.required]),
      screeningCircumstance: new FormControl('', [Validators.required]),
      viralType: new FormControl('', [Validators.required]),
      contaminationDate: new FormControl('', [Validators.required]),
      cdcStage: new FormControl('', [Validators.required])
    };

    this.PatientForm = this.fb.group(formControls);
  }

  // Getters pour accéder aux champs du formulaire
  get lastName() { return this.PatientForm.get('lastName'); }
  get firstName() { return this.PatientForm.get('firstName'); }
  get birthDate() { return this.PatientForm.get('birthDate'); }
  get gender() { return this.PatientForm.get('gender'); }
  get phoneNumber() { return this.PatientForm.get('phoneNumber'); }
  get city() { return this.PatientForm.get('city'); }
  get region() { return this.PatientForm.get('region'); }
  get postalCode() { return this.PatientForm.get('postalCode'); }
  get address() { return this.PatientForm.get('address'); }
  get nationality() { return this.PatientForm.get('nationality'); }
  get weight() { return this.PatientForm.get('weight'); }
  get height() { return this.PatientForm.get('height'); }
  get maritalStatus() { return this.PatientForm.get('maritalStatus'); }
  get children() { return this.PatientForm.get('children'); }
  get housing() { return this.PatientForm.get('housing'); }
  get housingType() { return this.PatientForm.get('housingType'); }
  get educationLevel() { return this.PatientForm.get('educationLevel'); }
  get smoking() { return this.PatientForm.get('smoking'); }
  get alcohol() { return this.PatientForm.get('alcohol'); }
  get drugUse() { return this.PatientForm.get('drugUse'); }
  get physicalActivity() { return this.PatientForm.get('physicalActivity'); }
  get bodyTemperature() { return this.PatientForm.get('bodyTemperature'); }
  get heartRate() { return this.PatientForm.get('heartRate'); }
  get bloodPressure() { return this.PatientForm.get('bloodPressure'); }
  get contaminationMode() { return this.PatientForm.get('contaminationMode'); }
  get initialScreeningType() { return this.PatientForm.get('initialScreeningType'); }
  get initialScreeningReason() { return this.PatientForm.get('initialScreeningReason'); }
  get lastNegativeDate() { return this.PatientForm.get('lastNegativeDate'); }
  get positiveHIVDate() { return this.PatientForm.get('positiveHIVDate'); }
  get hlaB5701Typing() { return this.PatientForm.get('hlaB5701Typing'); }
  get screeningCircumstance() { return this.PatientForm.get('screeningCircumstance'); }
  get viralType() { return this.PatientForm.get('viralType'); }
  get contaminationDate() { return this.PatientForm.get('contaminationDate'); }
  get cdcStage() { return this.PatientForm.get('cdcStage'); }

  addNewPatient() {
    let data = this.PatientForm.value;
    console.log(data);
    let patient = new Patient(
      undefined,
      data.lastName,
      data.firstName,
      data.birthDate,
      data.gender,
      data.phoneNumber,
      data.city,
      data.region,
      data.postalCode,
      data.address,
      data.nationality,
      data.weight,
      data.height,
      data.maritalStatus,
      data.children,
      data.housing,
      data.housingType,
      data.educationLevel,
      data.smoking,
      data.alcohol,
      data.drugUse,
      data.physicalActivity,
      data.bodyTemperature,
      data.heartRate,
      data.bloodPressure,
      data.contaminationMode,
      data.initialScreeningType,
      data.initialScreeningReason,
      data.lastNegativeDate,
      data.positiveHIVDate,
      data.hlaB5701Typing,
      data.screeningCircumstance,
      data.viralType,
      data.contaminationDate,
      data.cdcStage
    );

    console.log(patient);

    if (this.PatientForm.invalid) {
      this.messageCommande = `<div class="alert alert-warning" role="alert">
        Tous les champs sont obligatoires !
      </div>`;
    } else {
      this.service.addPatient(patient).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
          Patient ajouté avec succès !
        </div>`;
          this.router.navigate(['/listpatient']);
        },
        err => {
          console.log(err);
          this.messageCommande = `<div class="alert alert-danger" role="alert">
          Problème de serveur !
        </div>`;
        }
      );
    }
  }

  ngOnInit(): void {}
}
