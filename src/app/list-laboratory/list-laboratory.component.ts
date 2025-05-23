import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratory } from '../Entity/Laboratory.Entity';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';
import { HttpClient } from '@angular/common/http';
import { MedicalTreatment } from '../Entity/MedicalTreatment.Entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-laboratory',
  templateUrl: './list-laboratory.component.html',
  styleUrls: ['./list-laboratory.component.css']
})
export class ListLaboratoryComponent {
  uploadStatus: string | null = null;
  selectedImage: string | null = null;
  patient: Patient | null = null;
  patientId!: number;
  laboratory: Laboratory[] = [];
  searchDate: string = '';
  selectedPatientId: number | null = null;
  public saveDate?: Date;
  role: string;
  listPatients: Patient[] = [];
  filteredPatients: Patient[] = [];
  mainListFilteredPatients: Patient[] = [];
  treatments: MedicalTreatment[] = [];
  selectedFile: File | null = null;

  selectedFileName: string | null = null;
  searchTerm: string = '';
  fileType: string = 'DOCUMENT';
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
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
 // Méthode appelée automatiquement à l’initialisation du composant
  ngOnInit(): void {
     // Récupère l’ID du patient depuis l’URL
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
      // Charge la liste des patients associés au praticien connecté
    const practitionerEmail = localStorage.getItem('practitionnerEmail');
    if (practitionerEmail) {
      this.crudService.getPatientsByPractitionner(practitionerEmail).subscribe(
        patients => {
          this.listPatients = patients;
          console.log("Patients chargés :", this.listPatients);
        },
        error => {
          console.error("Erreur lors du chargement des patients :", error);
        }
      );
    } else {
      console.error("Aucun email de praticien trouvé dans le localStorage.");
    }
  }
 // Récupère les données du patient depuis l'API
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
// Filtre les résultats de laboratoire selon la date saisie
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
// Charge tous les résultats labo du patient depuis le backend
  getLaboratory(): void {
    this.crudService.getLaboratoryByPatientId(this.patientId).subscribe({
      next: (data) => {
        console.log("Données brutes reçues du serveur:", data);
        if (Array.isArray(data)) {
          this.laboratory = data.map(symptom => {
            if (symptom.medicaltestDate) {
              symptom.medicaltestDate = new Date(symptom.medicaltestDate);
            }
            return symptom;
          });
          this.filteredLaboratory = [...this.laboratory];
          console.log("Données de laboratoire après traitement:", this.laboratory);
        } else {
          console.error("Les données reçues ne sont pas un tableau:", data);
        }
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des résultats de laboratoire:", err);
      }
    });
  }


// Vérifie si la valeur est en dehors des plages normales
  isOutOfRange(key: string, value: number): boolean {
    if (this.usualRanges[key]) {
      return value < this.usualRanges[key].min || value > this.usualRanges[key].max;
    }
    return false;
  }

  updateLaboratory(laboratory: number) {
    this.router.navigate(['/medicalfolder/listlaboratory/updatelaboratory', laboratory]);
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile ? this.selectedFile.name : null;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => this.selectedImage = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedImage = null;
    }
  }

  onPatientSelected(event: any) {
    const patientId = event.target.value;
    if (patientId) {
      this.selectedPatientId = Number(patientId);
    } else {
      this.selectedPatientId = null;
    }
  }
  sendToFileNet() {
    if (!this.selectedFile || !this.selectedPatientId) {
      this.uploadStatus = 'Veuillez sélectionner un fichier et un patient';
      return;
    }

    console.log('Début de l\'upload vers FileNet');
    console.log('Fichier sélectionné:', this.selectedFile);
    console.log('Patient ID sélectionné:', this.selectedPatientId);
    console.log('Type de fichier sélectionné:', this.fileType);

    this.uploadStatus = 'Envoi du document en cours...';

    this.crudService.uploadFile(
      this.selectedFile,
      this.selectedFile.name,
      this.selectedPatientId,
      this.fileType,
      this.saveDate
    ).subscribe({
      next: (response) => {
        console.log('Réponse du serveur:', response);  // Affiche la réponse complète du serveur
        if (response && response.includes("uploaded and saved")) {  // Vérifie la présence du message d'upload
          this.uploadStatus = 'Document enregistré avec succès';
        } else {
          this.uploadStatus = response || 'Erreur lors de l\'upload';
        }
        this.selectedFile = null;
        this.selectedPatientId = null;
        this.selectedImage = null;
      },
      error: (error) => {
        console.error('Erreur lors de l\'upload:', error);
        this.uploadStatus = error.message || 'Erreur lors de l\'envoi du document';
        this.selectedFile = null;
        this.selectedPatientId = null;
        this.selectedImage = null;
      }
    });
  }

}

