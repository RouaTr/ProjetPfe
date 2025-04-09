import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-fonctionnal-symptoms',
  templateUrl: './fonctionnal-symptoms.component.html',
  styleUrls: ['./fonctionnal-symptoms.component.css']
})
export class FonctionnalSymptomsComponent {

 messageCommande = "";
 FunctionalSymptomsForm: FormGroup;
  patientId: number | null = null; // Initialisation correcte
  patientName: string = '';  // Définition de la propriété patientName
  patientLastName: string = '';
  constructor(private service: CrudService, private router: Router, private fb: FormBuilder,  private route: ActivatedRoute) {
    let formControls = {
      fever: new FormControl(''),
      diarrhea: new FormControl(''),
      cough: new FormControl(''),
      abdominalPain: new FormControl(''),
      dyspnea: new FormControl(''),
      nausea: new FormControl(''),
      asthenia: new FormControl(''),
      arthralgia: new FormControl(''),
      nightSweats: new FormControl(''),
      headache: new FormControl(''),
      dysphagia: new FormControl(''),
      pruritus: new FormControl(''),
      anorexia: new FormControl(''),
      insomnia: new FormControl(''),
      moodDisorders: new FormControl(''),
      rhinorrhea: new FormControl(''),
      paresthesia: new FormControl(''),
      cramps: new FormControl(''),
      visualDisturbances: new FormControl(''),
      myalgia: new FormControl(''),
      libidoDisorders: new FormControl(''),
      otherSymptoms: new FormControl(''),
      functionalSymptomsDate: new FormControl('', [Validators.required]),

    };

    this.FunctionalSymptomsForm = this.fb.group(formControls);
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
    });

  }

  // Getters pour accéder aux champs du formulaire
  get fever() { return this.FunctionalSymptomsForm.get('fever'); }
  get diarrhea() { return this.FunctionalSymptomsForm.get('diarrhea'); }
  get cough() { return this.FunctionalSymptomsForm.get('cough'); }
  get abdominalPain() { return this.FunctionalSymptomsForm.get('abdominalPain'); }
  get dyspnea() { return this.FunctionalSymptomsForm.get('dyspnea'); }
  get nausea() { return this.FunctionalSymptomsForm.get('nausea'); }
  get asthenia() { return this.FunctionalSymptomsForm.get('asthenia'); }
  get arthralgia() { return this.FunctionalSymptomsForm.get('arthralgia'); }
  get nightSweats() { return this.FunctionalSymptomsForm.get('nightSweats'); }
  get headache() { return this.FunctionalSymptomsForm.get('headache'); }
  get dysphagia() { return this.FunctionalSymptomsForm.get('dysphagia'); }
  get pruritus() { return this.FunctionalSymptomsForm.get('pruritus'); }
  get anorexia() { return this.FunctionalSymptomsForm.get('anorexia'); }
  get insomnia() { return this.FunctionalSymptomsForm.get('insomnia'); }
  get moodDisorders() { return this.FunctionalSymptomsForm.get('moodDisorders'); }
  get rhinorrhea() { return this.FunctionalSymptomsForm.get('rhinorrhea'); }
  get paresthesia() { return this.FunctionalSymptomsForm.get('paresthesia'); }
  get cramps() { return this.FunctionalSymptomsForm.get('cramps'); }
  get visualDisturbances() { return this.FunctionalSymptomsForm.get('visualDisturbances'); }
  get myalgia() { return this.FunctionalSymptomsForm.get('myalgia'); }
  get libidoDisorders() { return this.FunctionalSymptomsForm.get('libidoDisorders'); }
  get otherSymptoms() { return this.FunctionalSymptomsForm.get('otherSymptoms'); }
  get functionalSymptomsDateControl(): FormControl {
    return this.FunctionalSymptomsForm.get('functionalSymptomsDate') as FormControl;
  }
   isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
      return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);

    }
  logInvalidFields() {
    console.log("🔴 Champs invalides dans le formulaire :");

    Object.keys(this.FunctionalSymptomsForm.controls).forEach(key => {
      const control = this.FunctionalSymptomsForm.get(key);
      if (control?.invalid) {
        console.log(`❌ Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }
  addNewFunctionalSymptoms() {
    this.FunctionalSymptomsForm.markAllAsTouched();
    if (this.FunctionalSymptomsForm.invalid) {
      console.log("🚨 Formulaire invalide !");
      this.logInvalidFields(); // 🔍 Afficher les erreurs des champs invalides
      return;
    }
    if (!this.patientId) {
      console.error("Erreur : Aucun ID patient récupéré !");
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Impossible d'ajouter les signes fonctionnels : aucun patient enregistré.
      </div>`;
      return;
    }

    let data = this.FunctionalSymptomsForm.value;
    data = { ...data, patientId: this.patientId };

    console.log('Données envoyées:', data);

    this.service.addFunctionalSymptoms(this.patientId, data).subscribe(
      res => {
        console.log('Réponse du serveur:', res);
        this.messageCommande = `<div class="alert alert-success" role="alert">
          signes fonctionnels ajoutés avec succès !
        </div>`;
        setTimeout(() => {
          this.router.navigate([`medicalfolder/listfunctionalsymptoms/${this.patientId}`]);
        }, 2000);
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

