import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Observation } from '../Entity/Observation.Entity';
import { Patient } from '../Entity/Patient.Entity';

@Component({
  selector: 'app-update-observation',
  templateUrl: './update-observation.component.html',
  styleUrls: ['./update-observation.component.css']
})
export class UpdateObservationComponent implements OnInit {

  updateForm: FormGroup;
  id!: number;
  currentObservation!: Observation;
  public message!: string;
  patientId?: number; // Doit être bien défini dans la classe
  patient: Patient | null = null;
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
      observationDate: new FormControl('', [Validators.required]),
      observationDetails: new FormControl('', [Validators.required]),
    });
  }

  // Getters pour accéder aux champs du formulaire plus facilement
  get observationDateControl(): FormControl {
    return this.updateForm.get('observationDate') as FormControl;
  }
  get observationDetailsControl(): FormControl {
    return this.updateForm.get('observationDetails') as FormControl;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.service.findObservationById(this.id).subscribe((observation) => {
      console.log("🔹 Observation récupérée depuis l'API :", observation);

      if (!observation || !observation.patient) {
        console.error("⚠️ Erreur : L'observation ou le patient est null !");
        return;
      }
      this.patient = observation.patient; 

      this.currentObservation = observation;

      this.updateForm.patchValue({
        observationDate: observation.observationDate,
        observationDetails: observation.observationDetails,
      });

      console.log("🔹 Patient récupéré :", this.currentObservation.patient);
    });
  }

  logInvalidFields() {
    console.log("❌ Champs invalides dans le formulaire :");
    Object.keys(this.updateForm.controls).forEach(key => {
      const control = this.updateForm.get(key);
      if (control?.invalid) {
        console.log(` Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }

  updateObservation() {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.invalid) {
      console.log("🚨 Formulaire invalide !");
      this.logInvalidFields();
      return;
    }

    if (!this.currentObservation?.patient) {
      console.error("🚨 Erreur : patient est undefined !");
      return;
    }

    this.patientId = this.currentObservation.patient.id; // ✅ Récupération correcte de l'ID du patient

    let data = this.updateForm.value;
    let observation = new Observation();
    Object.assign(observation, data);
    observation.id = this.id;
    observation.patient = this.currentObservation.patient;

    console.log("🔄 Données envoyées pour mise à jour :", observation);

    this.service.updateObservation(this.id, this.patientId, observation).subscribe({
      next: (res) => {
        console.log("✅ Observation mise à jour avec succès :", res);
        this.router.navigate(['/medicalfolder/listobservation', this.patientId]);
      },
      error: (err) => {
        console.error("⚠️ Erreur lors de la mise à jour :", err);
      }
    });
  }

}
