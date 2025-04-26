import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratory } from '../Entity/Laboratory.Entity';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-laboratory',
  templateUrl: './list-laboratory.component.html',
  styleUrls: ['./list-laboratory.component.css']
})
export class ListLaboratoryComponent {
  uploadStatus: string | null = null;
  patient: Patient | null = null;
  patientId!: number;
  laboratory: Laboratory[] = [];
  searchDate: string = '';
  
    filteredLaboratory: Laboratory[] = [];
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
    cd4Count:{ min: 200 , max: Infinity},
    viralLoad:{ min:0, max: 50},
  };
  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,private router: Router,private http: HttpClient
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
  filterByDate(): void {
    if (!this.searchDate) {
      this.filteredLaboratory = [...this.laboratory]; // Afficher tout si la recherche est vide
    } else {
      this.filteredLaboratory = this.laboratory.filter(symptom => {
        if (symptom.medicaltestDate instanceof Date) {
          const formattedDate = symptom.medicaltestDate.toISOString().split('T')[0];
          return formattedDate === this.searchDate;
        } else {
          console.warn("Valeur inattendue pour medicaltestDate :", symptom.medicaltestDate);
          return false;
        }
      });
    }
  }

  getLaboratory(): void {
     this.crudService.getLaboratoryByPatientId(this.patientId).subscribe({
        next: (data) => {
          this.laboratory = data
            .filter(symptom => symptom.patient?.id === this.patientId)
            .map(symptom => {
              // Vérifier et convertir clinicalSymptomsDate en objet Date
              if (symptom.medicaltestDate) {
                symptom.medicaltestDate = new Date(symptom.medicaltestDate);
              }
              return this.filterSymptoms(symptom);
            })
            .filter(symptom => Object.keys(symptom).length > 1);
          this.filteredLaboratory = [...this.laboratory];
          console.log("Signes cliniques filtrés :", this.laboratory);
        },
        error: (err) => {
          console.warn("Erreur lors de la récupération des signes cliniques :", err);
        }
      });
    }
    private filterSymptoms(symptom: Laboratory): Laboratory {
        const filteredSymptom: { [key: string]: any } = {
          id: symptom.id,
          medicaltestDate: symptom.medicaltestDate
        };

        Object.keys(symptom).forEach((key) => {
          const value = (symptom as any)[key];
          if (value !== true && value !== null && value !== undefined && key !== 'id' && key !== 'medicaltestDate' && key !== 'patient') {
            filteredSymptom[key] = value;
          }
        });

        return filteredSymptom as Laboratory;
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
  selectedImage: string | null = null;
selectedFileName: string | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];
    this.selectedFileName = file.name;

    console.log("Fichier sélectionné:", file);  // Afficher le fichier pour déboguer
    console.log("Type de fichier:", file.type);

    // Vérifie si c'est une image ou un PDF
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      this.selectedImage = null;  // Réinitialiser l'image si c'est un PDF
      console.log("Fichier PDF sélectionné:", file);
      // Afficher un aperçu ou message d'information ici, si nécessaire
    } else {
      this.selectedImage = null;  // Réinitialiser pour les autres types de fichiers
      console.log('Fichier non valide:', file);
    }
  }
}



// Envoi du fichier vers IBM FileNet
sendToFileNet(): void {
  /* const file = this.selectedImage ? this.selectedImage : this.selectedFileName;

  if (!file) {
    console.error('Aucun fichier sélectionné');
    return;
  }

  // Créer un objet FormData pour l'envoi du fichier
  const formData = new FormData();
  formData.append('file', file);  // 'file' est le nom du champ que tu enverras à IBM FileNet

  // Envoi de la requête HTTP
 this.crudService.sendToFileNet(formData).subscribe({
    next: (response) => {
      console.log('Fichier envoyé à IBM FileNet avec succès', response);
      // Afficher une confirmation ou fermer l'interface d'envoi
    },
    error: (error) => {
      console.error('Erreur lors de l\'envoi du fichier à IBM FileNet:', error);
    }
  });*/
}


}

