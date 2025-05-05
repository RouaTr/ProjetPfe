import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Patient } from '../Entity/Patient.Entity';
import { Router } from '@angular/router';
import { MedicalTreatment } from '../Entity/MedicalTreatment.Entity';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent {
  uploadStatus: string | null = null;
  role: string;
  listPatients: Patient[] = [];
  filteredPatients: Patient[] = [];
  treatments: MedicalTreatment[] = [];

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

  selectedImage: string | null = null;
  selectedFileName: string | null = null;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => this.selectedImage = reader.result as string;
        reader.readAsDataURL(file);
      } else {
        this.selectedImage = null;
      }
    }
  }

  onAnalyzeTrends(patientId: number) {
    this.router.navigate(['/analysetrends', patientId]);
  }

  sendToFileNet() {
    if (this.selectedFile) {
      const title = this.selectedFileName || 'Document';

      this.service.uploadFileToFileNet(this.selectedFile, title)
        .subscribe({
          next: response => alert('Succès : ' + response),
          error: error => alert('Erreur : ' + error.error)
        });
    }
  }

  searchPatient(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value.trim().toLowerCase();

    if (searchValue) {
      const searchTerms = searchValue.split(' ');

      this.filteredPatients = this.listPatients.filter(patient => {
        const firstName = patient.firstName.toLowerCase();
        const lastName = patient.lastName.toLowerCase();
        const folderCode = patient.medicalRecordNumber.toLowerCase();

        const fullName = `${firstName} ${lastName}`;
        const reversedName = `${lastName} ${firstName}`;

        const matchesName = searchTerms.every(term =>
          fullName.includes(term) || reversedName.includes(term)
        );

        const matchesFolder = searchTerms.every(term =>
          folderCode.includes(term)
        );

        return matchesName || matchesFolder;
      });
    } else {
      this.filteredPatients = this.listPatients;
    }
  }
}
