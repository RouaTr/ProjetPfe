
import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Patient } from '../Entity/Patient.Entity';
import { Router } from '@angular/router';
import { MedicalTreatment } from '../Entity/MedicalTreatment.Entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent {
  uploadStatus: string | null = null;
  selectedImage: string | null = null;
  role: string;
  saveDate: Date;
  listPatients: Patient[] = [];
  filteredPatients: Patient[] = [];
  mainListFilteredPatients: Patient[] = [];
  treatments: MedicalTreatment[] = [];
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  selectedPatientId: number | null = null;
  searchTerm: string = '';
  messageCommande = '';
  fileType: string = 'DOCUMENT';

  constructor(private service: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;

    const practitionnerEmail = localStorage.getItem('practitionnerEmail');
    console.log('Practitionner Email:', practitionnerEmail);

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log('User Details:', userDetails);

    if (practitionnerEmail) {
      this.service.getPatientsByPractitionner(practitionnerEmail).subscribe(patients => {
        this.listPatients = patients;
        this.mainListFilteredPatients = patients;

        this.service.getMedicalTreatment().subscribe(treatments => {
          this.treatments = treatments;

          const today = new Date();

          this.listPatients.forEach(patient => {
            const patientTreatments = treatments.filter(t => t.patient?.id === patient.id);

            if (patientTreatments.length > 0) {
              patientTreatments.sort((a, b) =>
                new Date(b.treatmentRegistrationDate).getTime() - new Date(a.treatmentRegistrationDate).getTime()
              );
              patient.latestTreatment = patientTreatments[0];

              // Calcul de duration_of_visual_loss (à INSÉRER ici dans latestTreatment)
              const nextIntakeDate = patient.latestTreatment?.next_intake_Date
                ? new Date(patient.latestTreatment.next_intake_Date)
                : null;

              if (nextIntakeDate) {
                const today = new Date();
                const isToday = nextIntakeDate.toDateString() === today.toDateString();
                const isMissed = today > nextIntakeDate;

                if (isToday) {
                  (patient.latestTreatment as any).duration_of_visual_loss = 0;
                } else if (isMissed) {
                  const diffTime = Math.abs(today.getTime() - nextIntakeDate.getTime());
                  (patient.latestTreatment as any).duration_of_visual_loss = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                } else {
                  (patient.latestTreatment as any).duration_of_visual_loss = 0;
                }
              } else {
                (patient.latestTreatment as any).duration_of_visual_loss = 0;
              }
            } else {
              patient.latestTreatment = null;
            }
          });

          // Tri final : patients non décédés en haut, triés par date
          this.filteredPatients = this.listPatients.sort((a, b) => {
            const isADeceased = a.latestTreatment?.status?.toLowerCase() === 'décédé';
            const isBDeceased = b.latestTreatment?.status?.toLowerCase() === 'décédé';


            if (isADeceased && !isBDeceased) return 1;
            if (!isADeceased && isBDeceased) return -1;

            const dateA = a.latestTreatment?.next_intake_Date
              ? new Date(a.latestTreatment.next_intake_Date).getTime()
              : Infinity;
            const dateB = b.latestTreatment?.next_intake_Date
              ? new Date(b.latestTreatment.next_intake_Date).getTime()
              : Infinity;

            return dateA - dateB;
          });

          // Ajouter les couleurs
          this.filteredPatients.forEach((patient, index) => {
            if (index < 2) {
              (patient as any).nextIntakeColor = 'danger';
            } else if (index < 4) {
              (patient as any).nextIntakeColor = 'warning';
            } else {
              (patient as any).nextIntakeColor = 'info';
            }
          });
        });
      });
    } else {
      console.error("Practitioner email is not available.");
    }
  }

  onGenerateOrdonnance(patientId: number): void {
    this.service.generateOrdonnance(patientId).subscribe(
      (pdfBlob: Blob) => {
        const fileURL = URL.createObjectURL(pdfBlob);
        window.open(fileURL);
      },
      (error) => {
        console.error('Erreur lors de la génération du rapport :', error);
      }
    );
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
    if (!this.selectedFile || !this.selectedPatientId || !this.saveDate) {
      this.uploadStatus = 'Veuillez sélectionner un fichier, un patient et une date d\'enregistrement.';
      return;
    }

    console.log('Début de l\'upload vers FileNet');
    console.log('Fichier sélectionné:', this.selectedFile);
    console.log('Patient ID sélectionné:', this.selectedPatientId);
    console.log('Type de fichier sélectionné:', this.fileType);
    console.log('Date d\'enregistrement:', this.saveDate);

    this.uploadStatus = 'Envoi du document en cours...';

    this.service.uploadFile(
      this.selectedFile,
      this.selectedFile.name,
      this.selectedPatientId,
      this.fileType,  // Passe le type sélectionné ici
      this.saveDate   // Ajoute la saveDate ici
    ).subscribe({
      next: (response) => {
        console.log('Réponse du serveur:', response);  // Affiche la réponse complète du serveur
        if (response && response.includes("uploaded and saved")) {
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



  onAnalyzeTrends(patientId: number) {
    this.router.navigate(['/analysetrends', patientId]);
  }

  searchPatient(event: any) {
  const term = event.target.value.toLowerCase();

  if (!term) {
    this.filteredPatients = this.listPatients;
    this.messageCommande = ''; // Réinitialiser le message
    return;
  }

  this.filteredPatients = this.listPatients.filter(patient =>
    `${patient.lastName} ${patient.firstName}`.toLowerCase().includes(term) ||
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(term) ||
    patient.medicalRecordNumber.toLowerCase().includes(term)
  );

  if (this.filteredPatients.length === 0) {
    this.messageCommande = "Patient n'existe pas ";
  } else {
    this.messageCommande = ''; // Réinitialiser s'il y a des résultats
  }
}


  searchMainList(event: any) {
    const term = event.target.value.toLowerCase();
    if (!term) {
      this.mainListFilteredPatients = this.listPatients;
      return;
    }

    this.mainListFilteredPatients = this.listPatients.filter(patient =>
      `${patient.lastName} ${patient.firstName}`.toLowerCase().includes(term) ||
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(term) ||
      patient.medicalRecordNumber.toLowerCase().includes(term)
    );
  }
}
