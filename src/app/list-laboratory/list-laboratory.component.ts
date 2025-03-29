import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratory } from '../Entity/Laboratory.Entity';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-laboratory',
  templateUrl: './list-laboratory.component.html',
  styleUrls: ['./list-laboratory.component.css']
})
export class ListLaboratoryComponent {

  patient: Patient | null = null;
  patientId!: number;
  laboratory: Laboratory[] = [];
  usualRanges: { [key: string]: { min: number; max: number } } = {
    wbc: { min: 4, max: 10 },
    rbc: { min: 3.5, max: 5.8 },
    neutrophilsAbs: { min: 1.5, max: 7.5 },
    eosinophilsAbs: { min: 0.6, max: 5.8 },
    lymphocytesAbs: { min: 1, max: 4 },
    hematocrit: { min: 35, max: 55},
    hemoglobin: { min: 12, max: 17 },
    mcv: { min: 80, max: 100 },
    mch: { min: 27, max: 32},
    mchc: { min: 30, max: 36 },
    platelets: { min: 130, max: 450 },
    potassium: { min: 3.5, max: 5},
    sodium: { min: 135, max: 145 },
    mpv: { min: 7, max: 9 },
    urea: { min:2.5, max: 8},
    creatinine: { min:60, max: 120},
    asat: { min:5, max: 40},
    alat: { min:5, max: 40},
    directBilirubin: { min:1, max: 3},
    totalBilirubin: { min:3, max: 17},
    ggt: { min:5, max: 40},
    pal: { min:35, max: 140},
    calcium: { min:2.25, max: 2.65},
    lipase: { min:22, max: 70},
    albumin: { min:35, max: 45},
    phosphorus: { min:0.8, max: 1.4},
    magnesium: { min:0.74, max: 0.9},
  };
  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,private router: Router,
  ) {}

  ngOnInit(): void {
    // 🔹 Écoute les changements d'ID du patient
    this.route.paramMap.subscribe(params => {
      const id = params.get('patientId');
      if (id) {
        this.patientId = +id;
        console.log("ID du patient récupéré :", this.patientId);
        this.loadPatientData();
        this.getLaboratory();
      } else {
        console.error("Erreur : patientId non récupéré");
      }
    });
  }

  loadPatientData(): void {
    this.crudService.findPatientById(this.patientId).subscribe({
      next: (data) => {
        this.patient = data;
        console.log("Patient récupéré :", this.patient);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération du patient :", err);
      }
    });
  }

  getLaboratory(): void {
    this.crudService.getLaboratoryByPatientId(this.patientId).subscribe({
      next: (data) => {
        this.laboratory = data.filter(laboratory => laboratory.patient?.id === this.patientId);
        console.log("bilans du patient :", this.laboratory);
      },
      error: (err) => {
        console.warn("Erreur lors de la récupération des bilans :", err);
      }
    });
  }
  isOutOfRange(key: string, value: number): boolean {
    if (this.usualRanges[key]) {
      return value < this.usualRanges[key].min || value > this.usualRanges[key].max;
    }
    return false;
  }

  updateLaboratory(laboratory: number) {
    this.router.navigate(['/medicalfolder/listlaboratory/updatelaboratory', laboratory]);
  }
}

