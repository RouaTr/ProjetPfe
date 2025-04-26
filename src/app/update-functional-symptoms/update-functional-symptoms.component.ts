import { Component } from '@angular/core';
import { FunctionalSymptoms } from '../Entity/FunctionalSymptoms.Entity';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observation } from '../Entity/Observation.Entity';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-update-functional-symptoms',
  templateUrl: './update-functional-symptoms.component.html',
  styleUrls: ['./update-functional-symptoms.component.css']
})
export class UpdateFunctionalSymptomsComponent {


  updateForm: FormGroup;
  id!: number;
  currentFunctionalSymptoms!: FunctionalSymptoms;
  public message!: string;
  patientId?: number; // Doit être bien défini dans la classe
  patient: Patient | null = null;
  symptomList: string[] = [
    'fever', 'diarrhea', 'cough', 'abdominalPain', 'dyspnea', 'nausea',
    'asthenia', 'arthralgia', 'nightSweats', 'headache', 'dysphagia',
    'pruritus', 'anorexia', 'insomnia', 'moodDisorders', 'rhinorrhea',
    'paresthesia', 'cramps', 'visualDisturbances', 'myalgia', 'libidoDisorders', 'otherSymptoms'
  ];
  selectedSymptoms: string[] = [];
  symptomLabels: { [key: string]: string } = {
    fever: 'Fièvre',
    diarrhea: 'Diarrhée',
    cough: 'Toux',
    abdominalPain: 'Douleur abdominale',
    dyspnea: 'Dyspnée',
    nausea: 'Nausée',
    asthenia: 'Asthénie',
    arthralgia: 'Arthralgie',
    nightSweats: 'Sueurs nocturnes',
    headache: 'Céphalée',
    dysphagia: 'Dysphagie',
    pruritus: 'Prurit',
    anorexia: 'Anorexie',
    insomnia: 'Insomnie',
    moodDisorders: 'Troubles de l’humeur',
    rhinorrhea: 'Rhinorrhée',
    paresthesia: 'Paresthésie',
    cramps: 'Crampes',
    visualDisturbances: 'Troubles visuels',
    myalgia: 'Myalgie',
    libidoDisorders: 'Troubles de la libido',
    otherSymptoms: 'Autres symptômes'
  };

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let formControls: { [key: string]: FormControl } = {};
    this.symptomList.forEach(symptom => {
      formControls[symptom] = new FormControl(false); // Définir chaque case à cocher comme 'false' initialement
    });
    formControls['functionalSymptomsDate'] = new FormControl(null);
    this.updateForm = this.fb.group(formControls);
  }



  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.service.findFunctionalSymptomsById(this.id).subscribe((functionalsymptoms) => {
      console.log("🔹 signes fonctionnels récupérées depuis l'API :", functionalsymptoms);
      if (!functionalsymptoms || !functionalsymptoms.patient) {
        console.error("⚠️ Erreur : Les signes fonctionnels ou le patient est null !");
        return;
      }
      this.patient = functionalsymptoms.patient;

      this.currentFunctionalSymptoms = functionalsymptoms;

      this.updateForm.patchValue({
        fever: functionalsymptoms.fever,
        diarrhea: functionalsymptoms.diarrhea,
        cough: functionalsymptoms.cough,
        abdominalPain: functionalsymptoms.abdominalPain,
        dyspnea: functionalsymptoms.dyspnea,
        nausea: functionalsymptoms.nausea,
        asthenia: functionalsymptoms.asthenia,
        arthralgia: functionalsymptoms.arthralgia,
        nightSweats: functionalsymptoms.nightSweats,
        headache: functionalsymptoms.headache,
        dysphagia: functionalsymptoms.dysphagia,
        pruritus: functionalsymptoms.pruritus,
        anorexia: functionalsymptoms.anorexia,
        insomnia: functionalsymptoms.insomnia,
        moodDisorders: functionalsymptoms.moodDisorders,
        rhinorrhea: functionalsymptoms.rhinorrhea,
        paresthesia: functionalsymptoms.paresthesia,
        cramps: functionalsymptoms.cramps,
        visualDisturbances: functionalsymptoms.visualDisturbances,
        myalgia: functionalsymptoms.myalgia,
        libidoDisorders: functionalsymptoms.libidoDisorders,
        otherSymptoms: functionalsymptoms.otherSymptoms,
       functionalSymptomsDate: functionalsymptoms.functionalSymptomsDate
      });

      console.log("🔹 Patient récupéré :", this.currentFunctionalSymptoms.patient);
    });
  }
  get functionalSymptomsDate() { return this.updateForm.get('functionalSymptomsDate'); }
  onCheckboxChange(symptom: string): void {
    const control = this.updateForm.get(symptom); // Accède au contrôle de la case à cocher
    if (control?.value) {
      if (!this.selectedSymptoms.includes(symptom)) {
        this.selectedSymptoms.push(symptom);
      }
    } else {
      const index = this.selectedSymptoms.indexOf(symptom);
      if (index !== -1) {
        this.selectedSymptoms.splice(index, 1);
      }
    }
    console.log(this.selectedSymptoms); // Affiche les symptômes sélectionnés
  }
  isInvalidAndTouchedOrDirty(controlName: string): boolean {
    const control = this.updateForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty) ? true : false;
  }
  logInvalidFields() {
    console.log("🔴 Champs invalides dans le formulaire :");

    Object.keys(this.updateForm.controls).forEach(key => {
      const control = this.updateForm.get(key);
      if (control?.invalid) {
        console.log(`❌ Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }

  updateFunctionalSymptoms() {


    if (!this.currentFunctionalSymptoms?.patient) {
      console.error("🚨 Erreur : patient est undefined !");
      return;
    }

    this.patientId = this.currentFunctionalSymptoms.patient.id; // ✅ Récupération correcte de l'ID du patient

    let data = this.updateForm.value;
    let functionalsymptoms = new FunctionalSymptoms();
    Object.assign(functionalsymptoms, data);
    functionalsymptoms.id = this.id;
    functionalsymptoms.patient = this.currentFunctionalSymptoms.patient;

    console.log("🔄 Données envoyées pour mise à jour :", functionalsymptoms);

    this.service.updateFunctionalSymptoms(this.id, this.patientId, functionalsymptoms).subscribe({
      next: (res) => {
        console.log("✅ Les signes fonctionnels sont mis à jour avec succès :", res);
        this.router.navigate(['/medicalfolder/listfunctionalsymptoms', this.patientId]);
      },
      error: (err) => {
        console.error("⚠️ Erreur lors de la mise à jour :", err);
      }
    });
  }

}
