import { Component } from '@angular/core';
import { Practitionner } from '../Entity/Practitionner.Entity';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router
  ) {
    let formControls = {
      practitionnerEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    };

    this.loginForm = this.fb.group(formControls);
  }

  get practitionnerEmail() { return this.loginForm.get('practitionnerEmail'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {
    console.log('LoginComponent initialized');
  }

  login() {
    console.log('Login function called');
    console.log('Login form data:', this.loginForm.value);

    if (!this.loginForm.get('practitionnerEmail')?.value || !this.loginForm.get('password')?.value) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    console.log('Sending login request to service...');
    this.service.loginPractitionner(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful, response:', response);
        const role = response.practitionnerRole;

        if (role === 'admin') {
          this.router.navigate(['/manageaccess']);
        } else if (role === 'medecin') {
          this.router.navigate(['/home']);
        } else if (role === 'pharmacien') {
          this.router.navigate(['/listofmedicalprescriptions']);
        } else {
          this.errorMessage = 'Rôle non reconnu';
        }
      },
      error: (error) => {
        console.error('Error response from backend:', error);
        this.errorMessage = error.message || 'Une erreur est survenue lors de la connexion';

        // Réinitialiser le formulaire en cas d'erreur
        this.loginForm.reset();

        // Afficher le message d'erreur pendant 5 secondes
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }
}
