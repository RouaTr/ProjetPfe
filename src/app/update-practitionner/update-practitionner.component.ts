import { Component, OnInit } from '@angular/core';
import { Practitionner } from '../Entity/Practitionner.Entity';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-practitionner',
  templateUrl: './update-practitionner.component.html',
  styleUrls: ['./update-practitionner.component.css']
})
export class UpdatePractitionnerComponent implements OnInit{
  messageCommande = "";

updateForm: FormGroup;
  id!: number;
  currentPractitionner = new Practitionner();
  userFile: any;
  public message!: string;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,  // Router pour la navigation
    private route: ActivatedRoute  // ActivatedRoute pour récupérer l'ID
  ) {
    this.updateForm = this.fb.group({
     practitionnerLastName: new FormControl('', [Validators.required]),
           practitionnerFirstName: new FormControl('', [Validators.required]),
           practitionnerRole: new FormControl(''),

           practitionnerPhoneNumber: ['', [
             Validators.required,
             Validators.pattern(/^[0-9]{8}$/)
           ]],
           practitionnerEmail: new FormControl('', [Validators.required, Validators.email]),
           password: new FormControl('', [Validators.required]),
    });
  }
  get practitionnerLastName(): FormControl {
      return this.updateForm.get('practitionnerLastName') as FormControl;
    }
    get practitionnerFirstName(): FormControl {
      return this.updateForm.get('practitionnerFirstName') as FormControl;
    }
    get practitionnerPhoneNumber(): FormControl {
      return this.updateForm.get('practitionnerPhoneNumber') as FormControl;
    }
    get practitionnerEmail(): FormControl {
      return this.updateForm.get('practitionnerEmail') as FormControl;
    }
    get password(): FormControl {
      return this.updateForm.get('password') as FormControl;
    }


   isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
      return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);

    }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.service.findPractitionnerById(this.id).subscribe((practitionner) => {
      console.log(practitionner);

      this.updateForm.patchValue({
        practitionnerLastName: practitionner.practitionnerLastName,
        practitionnerFirstName: practitionner.practitionnerFirstName,
        practitionnerPhoneNumber: practitionner.practitionnerPhoneNumber,
        practitionnerEmail: practitionner.practitionnerEmail,
        password: practitionner.password,
        practitionnerRole: practitionner.practitionnerRole,

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
  updatePractitionner() {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.invalid) {
      console.log("🚨 Formulaire invalide !");
      this.logInvalidFields(); // 🔍 Afficher les erreurs des champs invalides
      return;
    }
    let data = this.updateForm.value;

    let practitionner = new Practitionner();
    Object.assign(practitionner , data);
    practitionner .id = this.id;

    console.log(practitionner );

    this.service.updatePractitionner(this.id, practitionner ).subscribe((res) => {
      console.log(res);
      this.messageCommande = " Mis a jour avec succé !";

    });
  }
}
