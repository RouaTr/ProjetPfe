import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TreatmentOption } from '../Entity/treatmentOption.Entity';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-medical-treatment',
  templateUrl: './add-medical-treatment.component.html',
  styleUrls: ['./add-medical-treatment.component.css']
})
export class AddMedicalTreatmentComponent {
  messageCommande = "";
  MedicalTreatmentForm: FormGroup;
  patientId: number | null = null;
  patientName: string = '';
  patientLastName: string = '';
  options: string[] = [];

  treatmentOptions: TreatmentOption[] = [];
  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,  private route: ActivatedRoute,private cdRef: ChangeDetectorRef
  ) {
    let formControls = {
      treatmentName: new FormControl('', [Validators.required]),
      treatmentStartDate: new FormControl('', [Validators.required]),
      treatment_intake_duration: new FormControl('', [Validators.required]),
      next_intake_Date: new FormControl('', [Validators.required]),
      duration_of_visual_loss: new FormControl(''),
      treatmentRegistrationDate: new FormControl('', [Validators.required]),
      status: new FormControl(''),
    };

    this.MedicalTreatmentForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadTreatmentOptions();
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



    this.MedicalTreatmentForm.get('treatmentStartDate')?.valueChanges.subscribe(() => {
      this.calculateNextAppointment();
    });

    this.MedicalTreatmentForm.get('treatment_intake_duration')?.valueChanges.subscribe(() => {
      this.calculateNextAppointment();
    });
  }



  calculateNextAppointment() {
    const startDate = this.MedicalTreatmentForm.get('treatmentStartDate')?.value;
    const duration = this.MedicalTreatmentForm.get('treatment_intake_duration')?.value;

    if (startDate && duration && !isNaN(duration)) {
      const startDateObj = new Date(startDate);
      const nextAppointment = new Date(startDateObj);
      nextAppointment.setDate(startDateObj.getDate() + (30 * duration)); // Ajoute les jours

      // Mettre à jour la valeur du champ "next_intake_Date"
      this.MedicalTreatmentForm.get('next_intake_Date')?.setValue(nextAppointment.toISOString().split('T')[0]);
    }
  }
  get treatmentName() {
    return this.MedicalTreatmentForm.get('treatmentName');
  }
  // Getters pour accéder aux champs du formulaire

  get treatmentStartDate() { return this.MedicalTreatmentForm.get('treatmentStartDate'); }
  get treatment_intake_duration() { return this.MedicalTreatmentForm.get('treatment_intake_duration'); }
  get next_intake_Date() { return this.MedicalTreatmentForm.get('next_intake_Date'); }
  get duration_of_visual_loss() { return this.MedicalTreatmentForm.get('duration_of_visual_loss'); }
  get treatmentRegistrationDate() { return this.MedicalTreatmentForm.get('treatmentRegistrationDate'); }
  get status() { return this.MedicalTreatmentForm.get('status'); }

  isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
    return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);
  }

  loadTreatmentOptions(): void {
    this.service.getAllTreatmentOptions().subscribe(
      (options: TreatmentOption[]) => {
        this.treatmentOptions = options;
      },
      error => {
        console.error('Erreur lors du chargement des options de traitement', error);
      }
    );
  }
  addNewMedicalTreatment() {
    this.MedicalTreatmentForm.markAllAsTouched();
    if (this.MedicalTreatmentForm.invalid) {
      console.log("🚨 Formulaire invalide !");
        this.messageCommande = `
          informations incompletes !
       `;
      this.logInvalidFields();
      return;
    }
    if (!this.patientId) {
      console.error("Erreur : Aucun ID patient récupéré !");
      this.messageCommande = `
        Impossible d'ajouter le traitement : aucun patient enregistré.
      `;
      return;
    }

    let data = this.MedicalTreatmentForm.value;
    data = { ...data, patientId: this.patientId };

    console.log('Données envoyées:', data);

    this.service.addMedicalTreatment(this.patientId, data).subscribe(
      res => {
        console.log('Réponse du serveur:', res);
        this.messageCommande = `
          Traitement ajouté avec succès !
       `;
       this.cdRef.detectChanges();
        setTimeout(() => {
        this.router.navigate([`/listmedicaltreatment/${this.patientId}`]);
      }, 1000);        },
      err => {
        console.error('Erreur:', err);
        this.messageCommande = `
          Problème de serveur ou données invalides !
       `;
      }
    );
  }

  logInvalidFields() {
    console.log(" Champs invalides dans le formulaire :");

    Object.keys(this.MedicalTreatmentForm.controls).forEach(key => {
      const control = this.MedicalTreatmentForm.get(key);
      if (control?.invalid) {
        console.log(` Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }
}
