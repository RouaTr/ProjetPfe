import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Patient } from '../Entity/Patient.Entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent {

  role:String
  listPatients: Patient[];
  filteredPatients: Patient[] = [];

  constructor(private service:CrudService,private router:Router ) { }




  ngOnInit(): void {
    this.role=localStorage.getItem("role")as string;
    this.service.getPatients().subscribe(patient => {
      this.listPatients= patient
      this.filteredPatients = patient;
    })
  }
  searchPatient(event: Event): void {
    const inputElement = event.target as HTMLInputElement;  // Cast de l'événement cible en HTMLInputElement
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

0

