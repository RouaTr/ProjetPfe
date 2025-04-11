import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  messageCommande="";
  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: CrudService
  ) {}

  ngOnInit(): void {
    // Assurez-vous que le nom du contrôle ici est 'practitionnerEmail' et qu'il est lié correctement
    this.resetPasswordForm = this.fb.group({
      practitionnerEmail: ['', [Validators.required, Validators.email]] // Correctement lié ici
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.practitionnerEmail;
      this.forgotPasswordService.requestPasswordReset(email).subscribe(
        response => {
          console.log('Link sent successfully', response);
          this.messageCommande = " lien envoyé verifiez votre email !";
        },
        error => {
          console.error('Error sending password reset link', error);
          this.messageCommande = " erreur l'hors de l'envoi !";
        }
      );
    }
  }
}
