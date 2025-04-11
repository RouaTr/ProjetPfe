import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {
  messageCommande = "";
  ObservationForm: FormGroup;
  patientId: number | null = null;
  patientName: string = '';  // Définition de la propriété patientName
  patientLastName: string = '';
  constructor(private service: CrudService, private router: Router, private fb: FormBuilder,  private route: ActivatedRoute) {
    let formControls = {
      observationDate: new FormControl('', [Validators.required]),
      observationDetails: new FormControl('', [Validators.required, Validators.minLength(10)]),
    };

    this.ObservationForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('patientId');
      if (id) {
        this.patientId = +id;
        console.log("🔹 ID du patient récupéré depuis l'URL :", this.patientId);

        // Charger le patient
        this.service.findPatientById(this.patientId).subscribe(
          (patient) => {
            this.patientName = patient.firstName;
            this.patientLastName = patient.lastName;
          },
          (error) => {
            console.error("Erreur lors de la récupération du patient :", error);
          }
        );
      } else {
        console.error("⚠️ Aucun ID patient dans l'URL !");
      }
    });}

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
        this.messageCommande = `
          Observation ajoutée avec succès !`;
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
