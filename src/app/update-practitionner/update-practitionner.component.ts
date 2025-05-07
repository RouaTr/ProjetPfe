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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
      practitionnerLastName: new FormControl('', [Validators.required]),
      practitionnerFirstName: new FormControl('', [Validators.required]),
      practitionnerPhoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]],
      practitionnerEmail: new FormControl('', [Validators.required, Validators.email])
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
        practitionnerEmail: practitionner.practitionnerEmail
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
      this.logInvalidFields();
      return;
    }

    let data = this.updateForm.value;
    let practitionner = new Practitionner();
    Object.assign(practitionner, data);
    practitionner.id = this.id;

    console.log('Données de mise à jour (sans mot de passe):', {
      id: this.id,
      practitionnerLastName: practitionner.practitionnerLastName,
      practitionnerFirstName: practitionner.practitionnerFirstName,
      practitionnerPhoneNumber: practitionner.practitionnerPhoneNumber,
      practitionnerEmail: practitionner.practitionnerEmail,
      practitionnerRole: practitionner.practitionnerRole,
      status: practitionner.status
    });

    this.service.updatePractitionner(this.id, {
      id: this.id,
      practitionnerLastName: practitionner.practitionnerLastName,
      practitionnerFirstName: practitionner.practitionnerFirstName,
      practitionnerPhoneNumber: practitionner.practitionnerPhoneNumber,
      practitionnerEmail: practitionner.practitionnerEmail,
      practitionnerRole: practitionner.practitionnerRole,
      status: practitionner.status
    }).subscribe({
      next: (res) => {
        console.log('Mise à jour réussie:', {
          ...res,
          password: '***'
        });
        this.messageCommande = 'Mise à jour réussie !';
        setTimeout(() => {
          const role = localStorage.getItem('practitionnerRole');
          if (role === 'admin') {
            this.router.navigate(['/manageaccess']);
          } else if (role === 'medecin') {
            this.router.navigate(['/home']);
          } else if (role === 'pharmacien') {
            this.router.navigate(['/listofmedicalprescriptions']);
          }
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        this.messageCommande = 'Erreur lors de la mise à jour. Veuillez réessayer.';
      }
    });
  }
}
