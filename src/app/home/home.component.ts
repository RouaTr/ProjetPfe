import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Chart, registerables } from 'chart.js';
import { MedicalTreatment } from '../Entity/MedicalTreatment.Entity';
import { Patient } from '../Entity/Patient.Entity';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  upcomingAppointments: any[] = [];  // Rendez-vous à venir
  listPatients: Patient[] = [];  // Liste des patients
  totalPatients: number = 0;
  maleNumber: number = 0;
  femaleNumber: number = 0;
  appointment:MedicalTreatment[] = [];

  constructor(private service: CrudService) {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);
  }


  loadPatientData(): void {
    this.service.getPatients().subscribe(patients => {
      this.listPatients = patients;
      this.totalPatients = patients.length;
      this.maleNumber = patients.filter(patient => patient.gender === 'Homme').length;
      this.femaleNumber = patients.filter(patient => patient.gender === 'Femme').length;

      this.loadUpcomingAppointments();
      this.createPieChart();
    });
  }
  ngOnInit(): void {
    this.loadPatientData(); // Appel unique ici
  }

  createPieChart(): void {
    const ctx = document.getElementById('genderChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Hommes', 'Femmes'],
          datasets: [{

            data: [this.maleNumber, this.femaleNumber],
            backgroundColor: ['#3498db', '#fd79a8'],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 20,
                padding: 15,
              }
            },
            tooltip: {
              enabled: true
            },
            datalabels: {
              display: true,
              formatter: (value: number, context) => {
                const data = context.dataset.data as number[];
                const total = data.reduce((acc, val) => acc + val, 0);
                const percentage = ((value / total) * 100).toFixed(2) + '%';
                return percentage;
              },
              color: 'white',
              font: {
                weight: 'bold',
                size: 14,
              }

            }
          }

        }
      });
    }
  }



  loadUpcomingAppointments(): void {
    this.service.getMedicalTreatment().subscribe(treatments => {
      const allAppointments: { patientName: string; patientSurname: string; phone: string; nextIntakeDate: Date }[] = [];

      this.listPatients.forEach(patient => {
        // Récupérer le dernier traitement du patient
        const latestTreatment = treatments
          .filter(t => t.patient?.id === patient.id)  // Filtrer les traitements par patient
          .sort((a, b) => new Date(b.next_intake_Date).getTime() - new Date(a.next_intake_Date).getTime())[0];  // Trier par date et prendre le plus récent

        // Assurer qu'il y a bien un traitement pour ce patient
        if (latestTreatment) {
          patient.latestTreatment = latestTreatment;  // Ajouter le dernier traitement au patient
        }
      });

      // Mettre à jour les rendez-vous à venir
      this.upcomingAppointments = this.listPatients
        .filter(patient => patient.latestTreatment)  // Ne garder que les patients ayant un dernier rendez-vous
        .map(patient => ({
          patientName: patient.lastName,
          patientSurname: patient.firstName,
          phone: patient.phoneNumber,
          nextIntakeDate: patient.latestTreatment.next_intake_Date
        }));

      // Trier les rendez-vous par date
      this.upcomingAppointments.sort((a, b) =>
        new Date(a.nextIntakeDate).getTime() - new Date(b.nextIntakeDate).getTime()
      );

      // Ne garder que les 2 plus proches
      this.upcomingAppointments = this.upcomingAppointments.slice(0, 2);
    });
  }




}
