import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token: string = '';
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupération du token depuis l'URL (query parameter)
    this.token = this.route.snapshot.queryParams['token'];
    console.log('Token récupéré depuis l’URL:', this.token); // 👈 Ici

    // Initialisation du formulaire avec validation
    this.resetForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    const password = this.resetForm.value.password;

    if (!this.token) {
      this.error = 'Token manquant dans l’URL.';
      return;
    }

    if (this.resetForm.invalid) {
      this.error = 'Le mot de passe est requis et doit contenir au moins 6 caractères.';
      return;
    }

    console.log('Token envoyé:', this.token); // 👈 Et ici
    console.log('Mot de passe envoyé:', password); // 👈 Et ici

    this.service.resetPassword(this.token, password).subscribe({
      next: () => {
        this.message = 'Votre mot de passe a été réinitialisé avec succès.';
        this.router.navigate(['/']); // Redirection vers la page de login
      },
      error: (err) => {
        console.error('Erreur API resetPassword:', err); // 👈 Et là
        this.error = 'Erreur lors de la réinitialisation du mot de passe.';
      }
    });
  }

}
