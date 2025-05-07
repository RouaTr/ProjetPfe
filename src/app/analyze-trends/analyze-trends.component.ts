import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { TrendDTO } from '../Entity/Trend.Entity';
import { Patient } from '../Entity/Patient.Entity';
import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ActivatedRoute } from '@angular/router';
import { TreatmentPredictionDTO } from '../Entity/TreatmentPredictionDTO';

@Component({
  selector: 'app-analyze-trends',
  templateUrl: './analyze-trends.component.html',
  styleUrls: ['./analyze-trends.component.css']
})
export class AnalyzeTrendsComponent {
  patient!: Patient;
  patientId!: number;
  trends: TrendDTO[] = [];
  loading: boolean = false;

  treatmentLegend: { name: string, color: string }[] = [];
  cd4Treatments: string[] = [];
  viralLoadTreatments: string[] = [];

  public cd4ChartData: ChartDataset<'line'>[] = [];
  public viralLoadChartData: ChartDataset<'line'>[] = [];
  public lineChartLabels: string[] = [];
  public ChartDataLabels = ChartDataLabels;

  public lineChartLegend = true;
  public lineChartType: 'line' = 'line';
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      datalabels: {
        color: 'black',
        font: { weight: 'bold' },
        formatter: (value: any) => value ?? '',
        anchor: 'end',
        align: 'top'
      },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: {
        type: 'logarithmic',
        title: { display: true, text: 'Valeur (log)' },
        min: 1,
        ticks: {
          callback: (value) => {
            const logValue = Math.log10(Number(value));
            return Number.isInteger(logValue) ? Number(value).toLocaleString() : '';
          }
        }
      }
    }
  };

  public latestCd4?: number;
  public latestViralLoad?: number;
  public alert: boolean = false;
  public alertDate: string = '';

  constructor(private crudService: CrudService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.patientId = +params.get('id')!;
      this.getTrendsForPatient();
      this.loadPatientData(this.patientId);
      this.predictTreatmentForPatient();
    });
  }

  getTrendsForPatient(): void {
    this.loading = true;
    this.crudService.getTrendsForPatient(this.patientId).subscribe(
      (data: TrendDTO[]) => {
        this.trends = data;
        this.loading = false;
        this.prepareChartData();
        this.checkAlerts();
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération des tendances:', error);
        this.loading = false;
      }
    );
  }

  loadPatientData(id: number): void {
    this.crudService.findPatientById(id).subscribe(patient => {
      this.patient = patient;
    });
  }

  formatDate(dateInput: string | Date): string {
    const date = (typeof dateInput === 'string') ? new Date(dateInput) : dateInput;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  prepareChartData(): void {
    if (!this.trends || this.trends.length === 0) return;

    const sortedTrends = [...this.trends].sort((a, b) =>
      new Date(a.medicalTestDate).getTime() - new Date(b.medicalTestDate).getTime()
    );

    const uniqueDates = Array.from(new Set(sortedTrends.map(t => this.formatDate(t.medicalTestDate))));

    const treatmentColorsMap = new Map<string, string>();
    const availableColors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFA500'];
    let colorIndex = 0;

    const cd4Data: (number | null)[] = [];
    const viralLoadData: (number | null)[] = [];

    this.cd4Treatments = [];
    this.viralLoadTreatments = [];

    let previousCd4Treatment = 'Non spécifié';
    let previousViralTreatment = 'Non spécifié';

    uniqueDates.forEach(dateLabel => {
      const trendsForDate = sortedTrends.filter(t => this.formatDate(t.medicalTestDate) === dateLabel);

      // --- CD4 ---
      const cd4Trends = trendsForDate.filter(t => t.cd4Count != null);
      if (cd4Trends.length > 0) {
        const averageCd4 = cd4Trends.reduce((sum, t) => sum + (t.cd4Count || 0), 0) / cd4Trends.length;
        cd4Data.push(averageCd4);
      } else {
        cd4Data.push(null);
      }

      // --- Viral Load ---
      const viralTrends = trendsForDate.filter(t => t.viralLoad != null);
      if (viralTrends.length > 0) {
        // Prendre la dernière valeur de charge virale pour cette date
        const latestViralTrend = viralTrends[viralTrends.length - 1];
        viralLoadData.push(latestViralTrend.viralLoad);
        
        // Mettre à jour la dernière charge virale globale
        if (dateLabel === uniqueDates[uniqueDates.length - 1]) {
          this.latestViralLoad = latestViralTrend.viralLoad;
          console.log('Dernière charge virale mise à jour:', this.latestViralLoad);
        }
      } else {
        viralLoadData.push(null);
      }

      const treatmentsSet = new Set<string>();
      cd4Trends.forEach(t => {
        const treatmentFromFunction = this.getTreatmentIfWithinRange(t);
        console.log('Date:', this.formatDate(t.medicalTestDate));
        console.log('Treatment from function:', this.getTreatmentIfWithinRange(t));
        console.log('Treatment from function:', treatmentFromFunction);

        if (treatmentFromFunction && treatmentFromFunction !== 'Non spécifié') {
          treatmentsSet.add(treatmentFromFunction);
        }
      });


      const combinedTreatment = Array.from(treatmentsSet).join(', ') || previousCd4Treatment;
      previousCd4Treatment = combinedTreatment;
      this.cd4Treatments.push(combinedTreatment);

      if (!treatmentColorsMap.has(combinedTreatment)) {
        treatmentColorsMap.set(combinedTreatment, availableColors[colorIndex++ % availableColors.length]);
      }

      const viralTreatmentsSet = new Set<string>();
      viralTrends.forEach(t => {
        const treatment = this.getTreatmentIfWithinRange(t);
        if (treatment && treatment !== 'Non spécifié') {
          viralTreatmentsSet.add(treatment);
        }
      });

      const combinedViralTreatment = Array.from(viralTreatmentsSet).join(', ') || previousViralTreatment;
      previousViralTreatment = combinedViralTreatment;
      this.viralLoadTreatments.push(combinedViralTreatment);

      if (!treatmentColorsMap.has(combinedViralTreatment)) {
        treatmentColorsMap.set(combinedViralTreatment, availableColors[colorIndex++ % availableColors.length]);
      }
    });

    this.lineChartLabels = uniqueDates;

    this.cd4ChartData = [{
      data: cd4Data,
      label: 'CD4',
      tension: 0.4,
      fill: false,
      spanGaps: true,
      pointRadius: 5,
      pointBackgroundColor: this.getPointColor(this.cd4Treatments, treatmentColorsMap),
      segment: {
        borderColor: (ctx) => {
          const i = ctx.p0DataIndex;
          const treatment = this.cd4Treatments[i];
          return treatmentColorsMap.get(treatment) || '#000';
        }
      },
    }];

    this.viralLoadChartData = [{
      data: viralLoadData,
      label: 'Charge virale',
      tension: 0.4,
      fill: false,
      spanGaps: true,
      pointRadius: 5,
      pointBackgroundColor: this.getPointColor(this.viralLoadTreatments, treatmentColorsMap),
      segment: {
        borderColor: (ctx) => {
          const i = ctx.p0DataIndex;
          const treatment = this.viralLoadTreatments[i];
          return treatmentColorsMap.get(treatment) || '#000';
        }
      },
    }];

    this.treatmentLegend = Array.from(treatmentColorsMap.entries()).map(([name, color]) => ({ name, color }));

    this.latestCd4 = cd4Data.filter(x => x != null).slice(-1)[0] ?? undefined;
    console.log('Dernière charge virale finale:', this.latestViralLoad);
  }

  getTreatmentIfWithinRange(trend: TrendDTO): string {
    const treatmentStartDate = new Date(trend.treatmentStartDate);
    const treatmentEndDate = trend.next_intake_Date ? new Date(trend.next_intake_Date) : null;
    const testDate = new Date(trend.medicalTestDate);

    if (testDate >= treatmentStartDate && (!treatmentEndDate || testDate <= treatmentEndDate)) {
      return trend.treatmentName?.trim() || 'Non spécifié';
    }
    return 'Non spécifié';

  }


  getPointColor(treatments: string[], colorsMap: Map<string, string>) {
    return (ctx: any) => {
      const i = ctx.dataIndex;
      const treatment = treatments[i] ?? 'Non spécifié';
      return colorsMap.get(treatment) ?? '#000';
    };
  }

  checkAlerts() {
    console.log('=== DÉBUT CHECK ALERTS ===');
    console.log('Dernière charge virale:', this.latestViralLoad);
    
    if (this.latestViralLoad && this.latestViralLoad > 50) {
      this.alert = true;
      // Trouver la date correspondante à la dernière charge virale
      const latestTrend = this.trends
        .filter(t => t.viralLoad === this.latestViralLoad)
        .sort((a, b) => new Date(b.medicalTestDate).getTime() - new Date(a.medicalTestDate).getTime())[0];
      
      if (latestTrend) {
        this.alertDate = this.formatDate(latestTrend.medicalTestDate);
        console.log('ALERTE ACTIVÉE - Charge virale détectable:', this.latestViralLoad, 'le', this.alertDate);
      }
    } else {
      this.alert = false;
      console.log('Pas d\'alerte - Charge virale indétectable ou non disponible');
    }
    
    console.log('=== FIN CHECK ALERTS ===');
  }
  viralLoad: number = 0;
  cd4Count: number = 0;
  treatmentName: string = '';

  predictionResult: TreatmentPredictionDTO | null = null;
  errorMessage: string | null = null;
  result?: TreatmentPredictionDTO;





 // Méthode pour appeler la prédiction de traitement
 predictTreatmentForPatient(): void {
  this.loading = true;
  this.result = undefined;
  this.errorMessage = '';

  this.crudService.predictFromLatestDataById(this.patientId).subscribe({
    next: (data) => {
      this.result = data;
      this.loading = false;
      // Si le traitement est efficace, afficher un message
      if (this.result?.effective) {
        this.errorMessage = 'Vous n\'avez pas besoin de modifier ce traitement';
      } else {
        this.errorMessage = `Traitement suggéré : ${this.result?.suggestedTreatment}`;
      }
    },
    error: (err) => {
      this.errorMessage = 'Erreur lors de la prédiction.';
      this.loading = false;
      console.error(err);
    }
  });
}


}
