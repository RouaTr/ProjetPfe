import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent  {
  patientId: number | null = null; // Initialisation de l'ID du patient

  ngOnInit() {
    const storedId = localStorage.getItem('selectedPatientId'); // Récupération depuis le localStorage
    if (storedId) {
      this.patientId = parseInt(storedId, 10);
      console.log("🔹 ID du patient récupéré :", this.patientId);
    } else {
      console.log("⚠️ Aucun patient sélectionné !");
    }
  }

}


