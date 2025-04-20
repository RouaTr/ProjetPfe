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
  role: string;
  listPatients: Patient[] = [];
  treatments: MedicalTreatment[] = [];

  totalPatientsHospital: number = 0; // Total patients dans l'hôpital
  totalMaleInHospital: number = 0;  // Total hommes dans l'hôpital
  totalFemaleInHospital: number = 0;
  totalPatients: number = 0;
  maleNumber: number = 0;
  femaleNumber: number = 0;

  patientsWithTreatment: number = 0;
  patientsWithoutTreatment: number = 0;

  upcomingAppointments: any[] = [];

  constructor(private service: CrudService) {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;
    const practitionerEmail = localStorage.getItem('practitionnerEmail');
    console.log('Practitioner Email:', practitionerEmail);

    if (practitionerEmail) {
      this.service.getPatientsByPractitionner(practitionerEmail).subscribe(patients => {
        this.listPatients = patients;
        this.totalPatients = patients.length;

        // Calculer le genre
        this.maleNumber = patients.filter((patient: Patient) => patient.gender === 'Homme').length;
        this.femaleNumber = patients.filter((patient: Patient) => patient.gender === 'Femme').length;



        // Charger les traitements
        this.service.getMedicalTreatment().subscribe(treatments => {
          this.treatments = treatments;

          this.listPatients.forEach(patient => {
            const patientTreatments = treatments
              .filter(t => t.patient?.id === patient.id)
              .sort((a, b) =>
                new Date(b.treatmentRegistrationDate).getTime() -
                new Date(a.treatmentRegistrationDate).getTime()
              );

            patient.latestTreatment = patientTreatments[0] || null;
          });

          // Statistiques traitement
          this.patientsWithTreatment = this.listPatients.filter(p => p.latestTreatment !== null).length;
          this.patientsWithoutTreatment = this.totalPatients - this.patientsWithTreatment;

          // Chargement des RDV
          this.loadUpcomingAppointments();
        });
        this.service.getPatients().subscribe(allPatients => {
          // Calculer les statistiques pour l'ensemble des patients dans l'hôpital
          this.totalPatientsHospital = allPatients.length;
          this.totalMaleInHospital = allPatients.filter((patient: Patient) => patient.gender === 'Homme').length;
          this.totalFemaleInHospital = allPatients.filter((patient: Patient) => patient.gender === 'Femme').length;
          this.createPieChart();
          console.log(`Total patients à l'hôpital: ${this.totalPatientsHospital}`);
          console.log(`Total hommes à l'hôpital: ${this.totalMaleInHospital}`);
          console.log(`Total femmes à l'hôpital: ${this.totalFemaleInHospital}`);
        });
      });
    }
  }

  createPieChart(): void {
    const ctx = document.getElementById('genderChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Hommes', 'Femmes'],
          datasets: [{

            data: [this.totalMaleInHospital, this.totalFemaleInHospital],
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
    this.upcomingAppointments = this.listPatients
      .filter(patient => patient.latestTreatment && patient.latestTreatment.next_intake_Date)
      .map(patient => ({
        patientName: patient.lastName,
        patientSurname: patient.firstName,
        phone: patient.phoneNumber,
        nextIntakeDate: patient.latestTreatment.next_intake_Date
      }))
      .sort((a, b) =>
        new Date(a.nextIntakeDate).getTime() - new Date(b.nextIntakeDate).getTime()
      )
      .slice(0, 2);
  }
}
