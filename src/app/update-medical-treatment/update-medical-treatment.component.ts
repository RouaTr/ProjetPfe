import { Component } from '@angular/core';
import { MedicalTreatment } from '../Entity/MedicalTreatment.Entity';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';
import { TreatmentOption } from '../Entity/treatmentOption.Entity';

@Component({
  selector: 'app-update-medical-treatment',
  templateUrl: './update-medical-treatment.component.html',
  styleUrls: ['./update-medical-treatment.component.css']
})
export class UpdateMedicalTreatmentComponent {
  options: string[] = [];
  treatmentOptions: TreatmentOption[] = [];
updateForm: FormGroup;
  id!: number;
  currentMedicalTreatment!: MedicalTreatment;
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
   treatmentName: new FormControl('', [Validators.required]),
      treatmentStartDate: new FormControl('', [Validators.required]),
      treatment_intake_duration: new FormControl('', [Validators.required]),
      next_intake_Date: new FormControl('', [Validators.required]),
     duration_of_visual_loss: new FormControl(''),
     treatmentRegistrationDate: new FormControl('', [Validators.required]),
      status: new FormControl(''),
    });
  }

  get treatmentName() { return this.updateForm.get('treatmentName'); }
  get treatmentStartDate() { return this.updateForm.get('treatmentStartDate'); }
  get treatment_intake_duration() { return this.updateForm.get('treatment_intake_duration'); }
  get next_intake_Date() { return this.updateForm.get('next_intake_Date'); }
  get duration_of_visual_loss() { return this.updateForm.get('duration_of_visual_loss'); }
  get treatmentRegistrationDate() { return this.updateForm.get('treatmentRegistrationDate'); }
  get status() { return this.updateForm.get('status'); }
  ngOnInit(): void {
    this.loadTreatmentOptions();
    const storedId = localStorage.getItem('selectedPatientId');
    if (storedId) {
      this.patientId = parseInt(storedId, 10);
      console.log("🔹 ID du patient récupéré :", this.patientId);
    } else {
      console.error("⚠️ Aucun patient sélectionné !");
    }
    this.updateForm.get('treatmentStartDate')?.valueChanges.subscribe(() => {
      this.calculateNextAppointment();
    });

    this.updateForm.get('treatment_intake_duration')?.valueChanges.subscribe(() => {
      this.calculateNextAppointment();
    });
    this.id = Number(this.route.snapshot.params['id']);

    this.service.findMedicalTreatmentById(this.id).subscribe((medicaltreatment) => {
      console.log("🔹 Observation récupérée depuis l'API :", medicaltreatment);

      if (!medicaltreatment || !medicaltreatment.patient) {
        console.error("⚠️ Erreur : L'observation ou le patient est null !");
        return;
      }
      this.patient = medicaltreatment.patient;

      this.currentMedicalTreatment = medicaltreatment;

      this.updateForm.patchValue({
        treatmentName: medicaltreatment.treatmentName,
        treatmentStartDate: medicaltreatment.treatmentStartDate,
        treatment_intake_duration: medicaltreatment.treatment_intake_duration,
        next_intake_Date: medicaltreatment.next_intake_Date,
        duration_of_visual_loss: medicaltreatment.duration_of_visual_loss,
        treatmentRegistrationDate: medicaltreatment.treatmentRegistrationDate,
        status: medicaltreatment.status,
      });

      console.log("🔹 Patient récupéré :", this.currentMedicalTreatment.patient);
    });
  }
  calculateNextAppointment() {
    const startDate = this.updateForm.get('treatmentStartDate')?.value;
    const duration = this.updateForm.get('treatment_intake_duration')?.value;

    if (startDate && duration && !isNaN(duration)) {
      const startDateObj = new Date(startDate);
      const nextAppointment = new Date(startDateObj);
      nextAppointment.setDate(startDateObj.getDate() + (30 * duration)); // Ajoute les jours

      // Mettre à jour la valeur du champ "next_intake_Date"
      this.updateForm.get('next_intake_Date')?.setValue(nextAppointment.toISOString().split('T')[0]);
    }
  }

 isInvalidAndTouchedOrDirty(control: AbstractControl | null): boolean {
    return (control as FormControl).invalid && ((control as FormControl).touched || (control as FormControl).dirty);

  }
    loadTreatmentOptions(): void {
      this.service.getAllTreatmentOptions().subscribe(
        (options: TreatmentOption[]) => {
          this.treatmentOptions = options;  // Assignez la réponse à la propriété treatmentOptions
        },
        error => {
          console.error('Erreur lors du chargement des options de traitement', error);
        }
      );
    }

  updateMedicalTreatment() {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.invalid) {
      console.log("🚨 Formulaire invalide !");
      this.logInvalidFields();
      return;
    }

    if (!this.currentMedicalTreatment?.patient) {
      console.error("🚨 Erreur : patient est undefined !");
      return;
    }

    this.patientId = this.currentMedicalTreatment.patient.id; // ✅ Récupération correcte de l'ID du patient

    let data = this.updateForm.value;
    let medicaltreatment = new MedicalTreatment();
    Object.assign(medicaltreatment, data);
    medicaltreatment.treatmentId= this.id;
    medicaltreatment.patient = this.currentMedicalTreatment.patient;

    console.log("🔄 Données envoyées pour mise à jour :", medicaltreatment);

    this.service.updateMedicalTreatment(this.id, this.patientId, medicaltreatment).subscribe({
      next: (res) => {
        console.log("✅ traitement mis à jour avec succès :", res);
        this.router.navigate(['/listmedicaltreatment', this.patientId]);
      },
      error: (err) => {
        console.error("⚠️ Erreur lors de la mise à jour :", err);
      }
    });
  }
  logInvalidFields() {
    console.log(" Champs invalides dans le formulaire :");

    Object.keys(this.updateForm.controls).forEach(key => {
      const control = this.updateForm.get(key);
      if (control?.invalid) {
        console.log(` Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }

}

