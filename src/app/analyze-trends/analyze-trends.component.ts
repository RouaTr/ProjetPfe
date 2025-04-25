import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { TrendDTO } from '../Entity/Trend.Entity';
import { Patient } from '../Entity/Patient.Entity';
import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ActivatedRoute } from '@angular/router';

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
  public cd4Treatments: string[] = [];
  public viralLoadTreatments: string[] = [];
  public viralLoadTreatmentTrends: TrendDTO[] = [];

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
      x: {
        title: { display: true, text: 'Date' }
      },
      y: {
        type: 'logarithmic',
        title: { display: true, text: 'Valeur (échelle logarithmique)' },
        min: 1,
        ticks: {
          callback: (value) => {
            const logValue = Math.log10(Number(value));
            if (Number.isInteger(logValue)) {
              return Number(value).toLocaleString();
            }
            return '';
          }
        }
      }
    }
  };

  constructor(private crudService: CrudService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.patientId = +params.get('id')!;
      this.getTrendsForPatient();
      this.loadPatientData(this.patientId);
    });
  }


  getTrendsForPatient(): void {
    this.loading = true;
    this.crudService.getTrendsForPatient(this.patientId).subscribe(
      (data: TrendDTO[]) => {
        this.trends = data;
        this.loading = false;
        this.prepareChartData();
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

  // Formatte une date en jj mm aaaa
  formatDate(dateInput: string | Date): string {
    const date = (typeof dateInput === 'string') ? new Date(dateInput) : dateInput;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }



  prepareChartData(): void {
    if (!this.trends || this.trends.length === 0) return;

    const sortedTrends = [...this.trends].sort((a, b) =>
      new Date(a.medicalTestDate).getTime() - new Date(b.medicalTestDate).getTime()
    );

    const uniqueDates = Array.from(
      new Set(sortedTrends.map(t => this.formatDate(t.medicalTestDate)))
    );

    const treatmentColorsMap = new Map<string, string>();
    const availableColors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFA500'];
    let colorIndex = 0;

    const cd4Data: (number | null)[] = [];
    this.cd4Treatments = [];
    const viralLoadData: (number | null)[] = [];
    this.viralLoadTreatments = [];

    uniqueDates.forEach(dateLabel => {
      const trendsForDate = sortedTrends.filter(t => this.formatDate(t.medicalTestDate) === dateLabel);

      const cd4Trend = trendsForDate.find(t => t.cd4Count != null);
      if (cd4Trend) {
        const treatment = this.getTreatmentIfWithinRange(cd4Trend);
        cd4Data.push(cd4Trend.cd4Count);
        this.cd4Treatments.push(treatment);
        if (!treatmentColorsMap.has(treatment)) {
          treatmentColorsMap.set(treatment, availableColors[colorIndex++ % availableColors.length]);
        }
      } else {
        cd4Data.push(null);
        this.cd4Treatments.push(' traitement non spécifié');
      }

      const viralTrend = trendsForDate.find(t => t.viralLoad != null);
      if (viralTrend) {
        const treatment = this.getTreatmentIfWithinRange(viralTrend);
        viralLoadData.push(viralTrend.viralLoad);
        this.viralLoadTreatments.push(treatment);
        if (!treatmentColorsMap.has(treatment)) {
          treatmentColorsMap.set(treatment, availableColors[colorIndex++ % availableColors.length]);
        }
      } else {
        viralLoadData.push(null);
        this.viralLoadTreatments.push('Sans traitement');
      }
    });

    this.lineChartLabels = uniqueDates;
    this.cd4ChartData = [{
      data: cd4Data,
      label: 'CD4',
      tension: 0.4,
      fill: false,
      pointRadius: 5,
      spanGaps: true,
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
      pointRadius: 5,
      spanGaps: true,
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
  }

  getTreatmentIfWithinRange(trend: TrendDTO): string {
    const treatmentStartDate = new Date(trend.treatmentStartDate);
    const treatmentEndDate = trend.next_intake_Date ? new Date(trend.next_intake_Date) : null;
    const testDate = new Date(trend.medicalTestDate);
    if (testDate >= treatmentStartDate && (!treatmentEndDate || testDate <= treatmentEndDate)) {
      return trend.treatmentName || 'Non spécifié';
    }
    return 'Sans traitement';
  }

  getTreatmentAt(dateStr: string): string {
    const date = new Date(dateStr);
    for (const t of this.viralLoadTreatmentTrends) {
      const start = new Date(t.treatmentStartDate);
      const end = new Date(t.next_intake_Date);
      if (date >= start && date <= end) {
        return t.treatmentName;
      }
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
}
