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
      this.logInvalidFields();
      return;
    }


    let data = this.PractitionnerForm.value;
    let practitionnerLastName = data.practitionnerLastName;
    let practitionnerFirstName = data.practitionnerFirstName;

    // Vérifier si le patient existe déjà
    this.crudService.doesPractitionnerExists(practitionnerLastName, practitionnerFirstName).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.messageCommande = " Le Pratitien existe déjà !";
          console.log(this.messageCommande);
          return;
        }

        // Création et ajout du patient
        let practitionner = new Practitionner(undefined, data.practitionnerLastName,data.practitionnerFirstName, data.practitionnerPhoneNumber, data.practitionnerEmail,
          data.password, data.practitionnerRole
        );

        this.crudService.addPractitionner(practitionner).subscribe(
          res => {
            console.log(" practitionner ajouté avec succès :", res);
            this.messageCommande = " Praticien ajouté avec succès !";
            this.router.navigate([``]);

            if (res && res.id) {
              localStorage.setItem('selectedPractitionnerId', res.id.toString());
            }


          },
          err => {
            console.log(" Erreur serveur :", err);
            this.messageCommande = " Problème de serveur !";
          }
        );
      },
      err => {
        console.log(" Erreur lors de la vérification du patient :", err);
        this.messageCommande = " Problème lors de la vérification du patient !";
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

