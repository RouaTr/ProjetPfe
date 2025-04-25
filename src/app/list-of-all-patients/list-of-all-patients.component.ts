import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalTreatment } from '../Entity/MedicalTreatment.Entity';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-of-all-patients',
  templateUrl: './list-of-all-patients.component.html',
  styleUrls: ['./list-of-all-patients.component.css']
})
export class ListOfAllPatientsComponent {

 patientId?: number;
 role: string;
  listPatients: Patient[] = [];
  filteredPatients: Patient[] = [];
  treatments: MedicalTreatment[] = [];
  id?: number;

  constructor(private service: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;

    this.service.getPatients().subscribe(patients => {
      this.listPatients = patients;
      console.log(this.listPatients);

      this.service.getMedicalTreatment().subscribe(treatments => {
        this.listPatients.forEach(patient => {
          // Filtrer les traitements pour ce patient
          const patientTreatments = treatments.filter(t => t.patient?.id === patient.id);

          if (patientTreatments.length > 0) {
            // Trier les traitements par date
            patientTreatments.sort((a, b) =>
              new Date(b.treatmentRegistrationDate).getTime() - new Date(a.treatmentRegistrationDate).getTime()
            );
            patient.latestTreatment = patientTreatments[0];
          } else {
            // Si aucun traitement, affecter une valeur nulle ou une valeur par défaut
            patient.latestTreatment = { next_intake_Date: null }; // Pas de traitement
          }
        });

        // Après avoir assigné les traitements, on trie tous les patients
        this.filteredPatients = this.listPatients
          .sort((a, b) => {
            // Utiliser une date par défaut pour les patients sans traitement
            const dateA = a.latestTreatment?.next_intake_Date
              ? new Date(a.latestTreatment.next_intake_Date).getTime()
              : Infinity; // Les patients sans traitement seront affichés à la fin

            const dateB = b.latestTreatment?.next_intake_Date
              ? new Date(b.latestTreatment.next_intake_Date).getTime()
              : Infinity;

            return dateA - dateB;
          });

        // Ajouter des couleurs selon la position
        this.filteredPatients.forEach((patient, index) => {
          if (index < 2) {
            (patient as any).nextIntakeColor = 'danger'; // 🔴
          } else if (index < 4) {
            (patient as any).nextIntakeColor = 'warning'; // 🟠
          } else {
            (patient as any).nextIntakeColor = 'info'; // 🟡
          }
        });
      });
    });


  }


  onGenerateOrdonnance(patientId: number): void {
    this.service.generateOrdonnance(patientId).subscribe(
      (pdfBlob: Blob) => {
        // Créez une URL à partir du blob PDF
        const fileURL = URL.createObjectURL(pdfBlob);
        // Ouvrir le PDF dans une nouvelle fenêtre ou onglet
        window.open(fileURL);
      },
      (error) => {
        console.error('Erreur lors de la génération du rapport :', error);
      }
    );
  }


  searchPatient(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value.trim().toLowerCase();

    if (searchValue) {
      // Convertir en minuscules et diviser les mots-clés
      const searchTerms = searchValue.toLowerCase().split(' ');

      // Filtrer la liste des patients
      this.filteredPatients = this.listPatients.filter(patient => {
        // Récupérer les champs en minuscules
        const firstName = patient.firstName.toLowerCase();
        const lastName = patient.lastName.toLowerCase();
        const folderCode = patient.medicalRecordNumber.toLowerCase();

        // Créer deux versions du nom complet
        const fullName = `${firstName} ${lastName}`;
        const reversedName = `${lastName} ${firstName}`;

        // Vérifie si tous les termes sont dans le nom complet ou le nom inversé
        const matchesName = searchTerms.every(term =>
          fullName.includes(term) || reversedName.includes(term)
        );

        // Vérifie si tous les termes sont dans le numéro de dossier
        const matchesFolder = searchTerms.every(term =>
          folderCode.includes(term)
        );

        // Retourner true si l'une des deux correspondances est vraie
        return matchesName || matchesFolder;
      });
    } else {
      // Si la barre de recherche est vide, afficher tous les patients
      this.filteredPatients = this.listPatients;
    }
  }
  onAnalyzeTrends(patientId: number) {
    this.router.navigate(['/analysetrends', patientId]);
  }

}


