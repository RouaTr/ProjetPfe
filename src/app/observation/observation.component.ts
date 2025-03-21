import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observation } from '../Entity/Observation.Entity';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {
  messageCommande = "";
  ObservationForm: FormGroup;

  constructor(private service: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      observationDate: new FormControl('', [Validators.required]),
      observationDetails: new FormControl('', [Validators.required, Validators.minLength(10)]),
    };

    this.ObservationForm = this.fb.group(formControls);
  }

  // Getters pour accéder aux champs du formulaire
  get observationDate() { return this.ObservationForm.get('observationDate'); }
  get observationDetails() { return this.ObservationForm.get('observationDetails'); }

  addNewObservation() {
    let data = this.ObservationForm.value;
    console.log('Données envoyées:', data);

    this.service.addObservation(data.patientId, data)
      .subscribe(
        res => {
          console.log('Réponse du serveur:', res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
            Observation ajoutée avec succès !
          </div>`;
          this.router.navigate(['/listobservation']);
        },
        err => {
          console.error('Erreur:', err);
          this.messageCommande = `<div class="alert alert-danger" role="alert">
            Problème de serveur ou données invalides !
          </div>`;
        }
      );
  }

  ngOnInit(): void {}
}
