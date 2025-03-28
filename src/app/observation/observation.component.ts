import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {
  messageCommande = "";
  ObservationForm: FormGroup;
  patientId: number | null = null; // Initialisation correcte

  constructor(private service: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      observationDate: new FormControl('', [Validators.required]),
      observationDetails: new FormControl('', [Validators.required, Validators.minLength(10)]),
    };

    this.ObservationForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    const storedId = localStorage.getItem('selectedPatientId');
    if (storedId) {
      this.patientId = parseInt(storedId, 10);
      console.log("🔹 ID du patient récupéré :", this.patientId);
    } else {
      console.error("⚠️ Aucun patient sélectionné !");
    }
  }

  // Getters pour accéder aux champs du formulaire
  get observationDate() { return this.ObservationForm.get('observationDate'); }
  get observationDetails() { return this.ObservationForm.get('observationDetails'); }

  addNewObservation() {
    if (!this.patientId) {
      console.error("Erreur : Aucun ID patient récupéré !");
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Impossible d'ajouter l'observation : aucun patient enregistré.
      </div>`;
      return;
    }

    let data = this.ObservationForm.value;
    data = { ...data, patientId: this.patientId };

    console.log('Données envoyées:', data);

    this.service.addObservation(this.patientId, data).subscribe(
      res => {
        console.log('Réponse du serveur:', res);
        this.messageCommande = `<div class="alert alert-success" role="alert">
          Observation ajoutée avec succès !
        </div>`;
        this.router.navigate([`/medicalfolder/listobservation/${this.patientId}`]);

      },
      err => {
        console.error('Erreur:', err);
        this.messageCommande = `<div class="alert alert-danger" role="alert">
          Problème de serveur ou données invalides !
        </div>`;
      }
    );
  }
}
