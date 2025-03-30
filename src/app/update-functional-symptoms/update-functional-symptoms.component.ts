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
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
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
    });
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

  isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
      return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);

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
