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
  messageCommande = "";
  loginForm: FormGroup;

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
    let data = this.loginForm.value;
    console.log('Login form data:', data);  // Vérifie si les données sont récupérées correctement

    let practitionner = new Practitionner(null, null, null, null, data.practitionnerEmail, data.password, null);

    if (!data.practitionnerEmail || !data.password) {
      console.log('Fields are missing');
      this.messageCommande = `<div class="alert alert-warning" role="alert">Veuillez remplir tous les champs.</div>`;
    } else {
      console.log('Sending login request to service...');
      this.service.loginPractitionner(practitionner).subscribe(
        res => {
          console.log('Response from backend:', res);  // Vérifie la réponse du backend
          if (res.token) {
            let token = res.token;
            localStorage.setItem("myToken", token);
            console.log('Token saved in localStorage:', token);

            localStorage.setItem("practitionnerRole", res.practitionnerRole);
            console.log('Role saved in localStorage:', res.practitionnerRole);

            // Redirige vers la page appropriée en fonction du rôle
            if (res.practitionnerRole === 'admin') {
              console.log('Redirecting to admin...');
              this.router.navigate(['manageaccess']);
            } else if (res.practitionnerRole === 'medecin') {
              console.log('Redirecting to medecin...');
              this.router.navigate(['home']);
            } else if (res.practitionnerRole === 'pharmacien') {
              console.log('Redirecting to pharmacien...');
              this.router.navigate(['/listofmedicalprescriptions']);
            } else {
              console.log('Unrecognized role, redirecting to login...');
              this.router.navigate(['']);  // Redirige si le rôle n'est pas reconnu
            }


          } else {
            console.log('No token received');
            this.messageCommande = `<div class="alert alert-warning" role="alert">Invalid credentials or missing token!</div>`;
          }
        },
        err => {
          console.log('Error response from backend:', err);  // Vérifie l'erreur renvoyée par le backend
          this.messageCommande = `<div class="alert alert-warning" role="alert"> Service en panne! </div>`;
        }
      );
    }
  }
}
