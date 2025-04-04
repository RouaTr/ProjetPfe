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

  role: string;
  listPatients: Patient[] = [];
  filteredPatients: Patient[] = [];
  treatments: MedicalTreatment[] = [];

  constructor(private service: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;

    // Récupérer tous les patients et tous les traitements en une seule fois
    this.service.getPatients().subscribe(patients => {
      this.listPatients = patients;

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
            patient.latestTreatment = null;
          }
        });

        // 🔽 Après avoir assigné les traitements à tous les patients
        this.filteredPatients = this.listPatients
          .filter(p => p.latestTreatment?.next_intake_Date) // garder ceux qui ont une date
          .sort((a, b) =>
            new Date(a.latestTreatment!.next_intake_Date!).getTime() -
            new Date(b.latestTreatment!.next_intake_Date!).getTime()
          );

        // Ajouter la couleur selon la position
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


  searchPatient(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value.trim().toLowerCase(); // Valeur de la recherche en minuscule

    if (searchValue) {
      // Diviser la recherche en mots
      const searchTerms = searchValue.split(' ');

      // Filtrer les patients
      this.filteredPatients = this.listPatients.filter(patient => {
        // Comparer prénom + nom et nom + prénom
        const fullName = `${patient.firstName.toLowerCase()} ${patient.lastName.toLowerCase()}`;
        const reversedName = `${patient.lastName.toLowerCase()} ${patient.firstName.toLowerCase()}`;

        // Vérifier si les termes de recherche correspondent dans l'une ou l'autre des ordres
        return searchTerms.every(term =>
          fullName.includes(term) || reversedName.includes(term)
        );
      });
    } else {
      // Si la barre de recherche est vide, afficher tous les patients
      this.filteredPatients = this.listPatients;
    }
  }
}
