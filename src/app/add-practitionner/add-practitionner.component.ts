import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Practitionner } from '../Entity/Practitionner.Entity';

@Component({
  selector: 'app-add-practitionner',
  templateUrl: './add-practitionner.component.html',
  styleUrls: ['./add-practitionner.component.css']
})
export class AddPractitionnerComponent {

  messageCommande = "";
  PractitionnerForm: FormGroup;

  constructor(private crudService: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      practitionnerLastName: new FormControl('', [Validators.required]),
      practitionnerFirstName: new FormControl('', [Validators.required]),

      practitionnerPhoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]],
      practitionnerEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      practitionnerRole: new FormControl('',[Validators.required]),


    }
  

    this.PractitionnerForm = this.fb.group(formControls);

  }
  get practitionnerLastName(): FormControl {
    return this.PractitionnerForm.get('practitionnerLastName') as FormControl;
  }
  get practitionnerFirstName(): FormControl {
    return this.PractitionnerForm.get('practitionnerFirstName') as FormControl;
  }
  get practitionnerPhoneNumber(): FormControl {
    return this.PractitionnerForm.get('practitionnerPhoneNumber') as FormControl;
  }
  get practitionnerEmail(): FormControl {
    return this.PractitionnerForm.get('practitionnerEmail') as FormControl;
  }
  get password(): FormControl {
    return this.PractitionnerForm.get('password') as FormControl;
  }


  isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
    return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);

  }


 addNewPractitionner() {
  this.PractitionnerForm.markAllAsTouched();
  if (this.PractitionnerForm.invalid) {
    console.log("🚨 Formulaire invalide !");
    this.messageCommande = "🚨 informations invalides !";
    this.logInvalidFields();
    return;
  }

  let data = this.PractitionnerForm.value;

  let practitioner = new Practitionner(
    undefined,
    data.practitionnerLastName,
    data.practitionnerFirstName,
    data.practitionnerPhoneNumber,
    data.practitionnerEmail,
    data.password,
    data.practitionnerRole
  );

 this.crudService.addPractitionner(practitioner).subscribe(
  res => {
    console.log("praticien ajouté avec succès :", res);
    this.messageCommande = "✅ compte ajouté avec succès !";

    if (res && res.id) {
      localStorage.setItem('selectedPractitionnerId', res.id.toString());
    }

    setTimeout(() => {
      this.router.navigate([``]);
    }, 2000);
  },
  err => {
    console.log("Erreur lors de l'ajout :", err);
    if (err.status === 404 && err.error.message === "email exist deja !") {
      this.messageCommande = "⚠️ Ce praticien existe déjà avec cet email.";
    } else {
      this.messageCommande = "❌ Problème de serveur !";
    }
  }
);

}


  logInvalidFields() {
    console.log(" Champs invalides dans le formulaire :");
    Object.keys(this.PractitionnerForm.controls).forEach(key => {
      const control = this.PractitionnerForm.get(key);
      if (control?.invalid) {
        console.log(` Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }

  ngOnInit(): void {}
}

