import { Component } from '@angular/core';
import { ClinicalSymptoms } from '../Entity/ClinicalSymptoms.Entity';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-update-clinical-symptoms',
  templateUrl: './update-clinical-symptoms.component.html',
  styleUrls: ['./update-clinical-symptoms.component.css']
})
export class UpdateClinicalSymptomsComponent {

  patient: Patient | null = null;
  ClinicalSymptomsForm: FormGroup;
  patientId: number ;
  messageCommande = "";
  symptomId: number;

  currentClinicalSymptoms!: ClinicalSymptoms;

  options: { [key: string]: string[] } = {
    generalSigns: [
      'Adénopathie isolée', 'Adénopathies généralisées', 'Amaigrissement', 'Cachexie',
      'Fièvre aigüe', 'Fièvre persistante', 'Prise de poids', 'Syndrome dysthyroïdien',
      'Syndrome pseudogrippal', 'Syndrome sec', 'Altération de l\'état général', 'Autres signes généraux'
  ],
  dermatological: [
      'Abcès', 'Acné', 'Allergie médicamenteuse (Dermite)', 'Angiome stellaire', 'Aphtes', 'Condylomes',
      'Dermatose bulleuse', 'Dermite séborrhéique', 'Eczéma', 'Éruption cutanée ',
      'Érythème', 'Érythrose palmaire', 'Folliculite', 'Gale', 'Herpès', 'Kaposi cutané',
      'Leucoplasie chevelue', 'Lichen plan', 'Mélanodermie', 'Muguet buccal', 'Ongles: anomalies à préciser',
      'Onychomycose'
  ],
  neuroMuscular: [
      'Ataxie', 'Atteinte des fonctions supérieures', 'Déficit moteur', 'Déficit sensitif', 'Lumbago', 'Myalgie',
      'Paralysie faciale', 'Polynévrite', 'Syndrome méningé', 'Tremblement', 'Vertiges', 'Autres signes neuro'
  ],
  ent: [
      'Aphtes', 'Aphtose', 'Leucoplasie chevelue', 'Muguet buccal', 'Otorrhée', 'Parotide hypertrophiée',
      'Pharyngite', 'Sinusite', 'Autres signes ORL'
  ],
  psychiatric: [
      'Démence liée au VIH', 'Dépression majeure', 'Désorientation', 'Irritabilité', 'Syndrome dépressif',
      'Trouble de l\'humeur', 'Trouble de la mémoire', 'Trouble du comportement', 'Autres signes neuro-psychiatriques'
  ],
  cardiovascular: [
      'Claudication intermittente', 'Hypertension artérielle', 'Hypotension artérielle', 'Oedème', 'Souffle artériel',
      'Souffle cardiaque', 'Trouble du rythme', 'Autres signes cardiovasculaires'
  ],
  digestive: [
      'Angiome stellaire', 'Ascite', 'Circulation veineuse collatérale', 'Diarrhée', 'Douleurs abdominales',
      'Dysphagie', 'Encéphalopathie hépatique', 'Erythrose palmaire', 'Gastroentérite', 'Hémorragie digestive',
      'Hépatomégalie', 'Ictère', 'Masse abdominale', 'Nausées et vomissements', 'Splénomégalie', 'Varices oesophagiennes',
      'Autres signes digestifs'
  ],
  lipodystrophy: [
      'Accumulation de graisse', 'Ballonnement abdominal', 'Bosse de bison', 'Gynécomastie', 'Perte de graisse'
  ],
  genitourinary: [
      'Coliques néphrétiques', 'Condylomes', 'Dysplasie légère du col', 'Dysplasie moyenne du col', 'Dysplasie sévère du col',
      'Ecoulement urétral', 'Fissure anale', 'Fistule anale', 'Grossesse', 'Hypertrophie mammaire', 'Leucorrhée',
      'Toucher vaginal', 'Ulcérations génitales', 'Autres signes uro-génitaux'
  ],
  ophthalmological: [
      'Amputation champ visuel', 'Baisse acuité visuelle', 'Cécité', 'Conjonctivite', 'Kératite', 'Trouble visuel (SAI)',
      'Autres signes ophtalmologiques'
  ],
  pulmonary: [
      'Bronchite aiguë (SAI)', 'Bronchite chronique (SAI)', 'Cyanose', 'Dyspnée', 'Râles', 'Sifflements', 'Toux',
      'Autres signes pleuro-pulmonaires'
  ],
  puberty: [
      'Classif. Tanner - Filles - S1', 'Classif. Tanner - Filles - S2', 'Classif. Tanner - Filles - S3',
      'Classif. Tanner - Filles - S4', 'Classif. Tanner - Filles - S5', 'Classif. Tanner - Filles - P1',
      'Classif. Tanner - Filles - P2', 'Classif. Tanner - Filles - P3', 'Classif. Tanner - Filles - P4',
      'Classif. Tanner - Filles - P5', 'Classif. Tanner - Garçons - T1', 'Classif. Tanner - Garçons - T2',
      'Classif. Tanner - Garçons - T3', 'Classif. Tanner - Garçons - T4', 'Classif. Tanner - Garçons - T5',
      'Classif. Tanner - Garçons - P1', 'Classif. Tanner - Garçons - P2', 'Classif. Tanner - Garçons - P3',
      'Classif. Tanner - Garçons - P4', 'Classif. Tanner - Garçons - P5'
  ]

  };

  optionsKeys: string[] = [];

  constructor(private service: CrudService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    let formControls = {
      generalSigns: new FormArray(this.options['generalSigns'].map(() => new FormControl(false))),
      dermatological: new FormArray(this.options['dermatological'].map(() => new FormControl(false))),
      neuroMuscular: new FormArray(this.options['neuroMuscular'].map(() => new FormControl(false))),
      ent: new FormArray(this.options['ent'].map(() => new FormControl(false))),
      psychiatric: new FormArray(this.options['psychiatric'].map(() => new FormControl(false))),
      cardiovascular: new FormArray(this.options['cardiovascular'].map(() => new FormControl(false))),
      digestive: new FormArray(this.options['digestive'].map(() => new FormControl(false))),
      lipodystrophy: new FormArray(this.options['lipodystrophy'].map(() => new FormControl(false))),
      genitourinary: new FormArray(this.options['genitourinary'].map(() => new FormControl(false))),
      ophthalmological: new FormArray(this.options['ophthalmological'].map(() => new FormControl(false))),
      pulmonary: new FormArray(this.options['pulmonary'].map(() => new FormControl(false))),
      puberty: new FormArray(this.options['puberty'].map(() => new FormControl(false))),
      clinicalSymptomsDate: ['', Validators.required]
    };

    this.ClinicalSymptomsForm = fb.group(formControls);
  }

  ngOnInit(): void {
    this.optionsKeys = Object.keys(this.options);
    const storedId = localStorage.getItem('selectedPatientId');
    if (storedId) {
      this.patientId = parseInt(storedId, 10);
      console.log("🔹 ID du patient récupéré :", this.patientId);
    } else {
      console.error("⚠️ Aucun patient sélectionné !");
    }

    // Récupérer l'ID du symptôme à mettre à jour à partir de l'URL
    this.route.params.subscribe(params => {
      this.symptomId = params['id'];
      if (this.symptomId) {
        this.loadClinicalSymptoms(this.symptomId);
      }
    });
  }

  loadClinicalSymptoms(symptomId: number): void {
    this.service.findClinicalSymptomsById(this.symptomId).subscribe(

      (res: any) => {
        console.log("✅ Symptômes cliniques récupérés :", res);
        const data = res;

        // Remplir le formulaire avec les données
        this.ClinicalSymptomsForm.patchValue({
          clinicalSymptomsDate: data.clinicalSymptomsDate
        });

        // Transformer les chaînes en tableaux et mettre à jour les contrôles des FormArray
        this.setSymptomsArray('generalSigns', data.generalSigns);
        this.setSymptomsArray('dermatological', data.dermatological);
        this.setSymptomsArray('ent', data.ent);
        this.setSymptomsArray('psychiatric', data.psychiatric);
        this.setSymptomsArray('cardiovascular', data.cardiovascular);
        this.setSymptomsArray('digestive', data.digestive);
        this.setSymptomsArray('lipodystrophy', data.lipodystrophy);
        this.setSymptomsArray('genitourinary', data.genitourinary);
        this.setSymptomsArray('ophthalmological', data.ophthalmological);
        this.setSymptomsArray('pulmonary', data.pulmonary);
        this.setSymptomsArray('puberty', data.puberty);


      },
      (err) => {
        console.error("❌ Erreur lors de la récupération des symptômes :", err);
      }
    );
  }

  setSymptomsArray(group: string, symptoms: string | null | undefined): void {
    const control = this.ClinicalSymptomsForm.get(group) as FormArray;

    // Vérifier si symptoms est défini, sinon utiliser une chaîne vide
    const symptomsArray = symptoms ? symptoms.split(', ').map(symptom => symptom.trim()) : [];

    if (!control) {
      console.error(`Le FormArray '${group}' est introuvable.`);
      return;
    }

    if (!this.options[group]) {
      console.error(`Les options pour '${group}' sont introuvables.`);
      return;
    }

    this.options[group].forEach((option, index) => {
      control.controls[index]?.setValue(symptomsArray.includes(option));
    });
  }


  onCheckboxChange(event: any, group: string, option: any) {
    const control = this.ClinicalSymptomsForm.get(group) as FormArray;
    if (event.target.checked) {
      if (!control.value.includes(option)) {
        control.push(new FormControl(option));
      }
    } else {
      const index = control.controls.findIndex((ctrl) => ctrl.value === option);
      if (index !== -1) {
        control.removeAt(index);
      }
    }
  }

  convertArrayToString(arr: any[], options: string[]): string {
    return arr
      .map((selected, index) => selected ? options[index] : null)
      .filter(symptom => symptom !== null)
      .join(', ');
  }

  isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
    return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);

  }

  logInvalidFields() {
    console.log("🔴 Champs invalides dans le formulaire :");
    Object.keys(this.ClinicalSymptomsForm.controls).forEach(key => {
      const control = this.ClinicalSymptomsForm.get(key);
      if (control?.invalid) {
        console.log(`❌ Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
        if (control instanceof FormArray) {
          control.controls.forEach((ctrl, index) => {
            if (ctrl.invalid) {
              console.log(`   ↳ Erreur dans FormArray ${key} à l'index ${index}`);
            }
          });
        }
      }
    });
  }

  get clinicalSymptomsDate() { return this.ClinicalSymptomsForm.get('clinicalSymptomsDate'); }

  updateClinicalSymptoms() {

    this.ClinicalSymptomsForm.markAllAsTouched();
    if (this.ClinicalSymptomsForm.invalid) {
      console.log("🚨 Formulaire invalide !");
      this.logInvalidFields(); // Afficher les erreurs des champs invalides
      return;
    }

    if (!this.patientId) {
      console.error("Erreur : Aucun ID patient récupéré !");
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Impossible de mettre à jour les signes fonctionnels : aucun patient enregistré.
      </div>`;
      return;
    }

    if (this.ClinicalSymptomsForm.get('clinicalSymptomsDate')?.invalid) {
      console.log("🚨 La date est obligatoire !");
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Veuillez renseigner la date avant de soumettre le formulaire.
      </div>`;
      return;
    }
    console.log("📅 Date enregistrée :", this.ClinicalSymptomsForm.value.clinicalSymptomsDate);

    let data = this.ClinicalSymptomsForm.value;

    // Convertir les tableaux en chaînes de caractères
    data = {
      ...data,
      generalSigns: this.convertArrayToString(data.generalSigns, this.options['generalSigns']),
      dermatological: this.convertArrayToString(data.dermatological, this.options['dermatological']),
      neuroMuscular: this.convertArrayToString(data.neuroMuscular, this.options['neuroMuscular']),
      ent: this.convertArrayToString(data.ent, this.options['ent']),
      psychiatric: this.convertArrayToString(data.psychiatric, this.options['psychiatric']),
      cardiovascular: this.convertArrayToString(data.cardiovascular, this.options['cardiovascular']),
      digestive: this.convertArrayToString(data.digestive, this.options['digestive']),
      lipodystrophy: this.convertArrayToString(data.lipodystrophy, this.options['lipodystrophy']),
      genitourinary: this.convertArrayToString(data.genitourinary, this.options['genitourinary']),
      ophthalmological: this.convertArrayToString(data.ophthalmological, this.options['ophthalmological']),
      pulmonary: this.convertArrayToString(data.pulmonary, this.options['pulmonary']),
      puberty: this.convertArrayToString(data.puberty, this.options['puberty']),
      clinicalSymptomsDate: this.ClinicalSymptomsForm.value.clinicalSymptomsDate,
      patientId: this.patientId
    };

    console.log("📤 Données envoyées :", JSON.stringify(data, null, 2));

    let clinicalsymptoms = new ClinicalSymptoms();
        Object.assign(clinicalsymptoms, data);
        clinicalsymptoms.id = this.symptomId;
       


    this.service.updateClinicalSymptoms(this.symptomId, this.patientId, clinicalsymptoms).subscribe({
      next: (res) => {
        console.log("✅ signes cliniques mise à jour avec succès :", res);
        this.router.navigate(['/medicalfolder/listclinicalsymptoms', this.patientId]);
      },
      error: (err) => {
        console.error("⚠️ Erreur lors de la mise à jour :", err);
      }
    });
  }
  }

