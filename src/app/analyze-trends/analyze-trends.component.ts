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
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const index = context.dataIndex;
            const datasetLabel = context.dataset.label || '';
            const value = context.formattedValue;
            const chart: any = context.chart;
            let treatment = '';

            if (datasetLabel === 'CD4') {
              treatment = chart.config.options?.plugins?.custom?.cd4Treatments?.[index] ?? 'Non spécifié';
            } else if (datasetLabel === 'Charge virale') {
              treatment = chart.config.options?.plugins?.custom?.viralLoadTreatments?.[index] ?? 'Non spécifié';
            }

            return `${datasetLabel}: ${value} (Traitement: ${treatment})`;
          }
        }
      }

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

  prepareChartData(): void {
    if (!this.trends || this.trends.length === 0) return;

    const sortedTrends = [...this.trends].sort((a, b) =>
      new Date(a.medicalTestDate).getTime() - new Date(b.medicalTestDate).getTime()
    );

    const uniqueDates = Array.from(new Set(sortedTrends.map(t => new Date(t.medicalTestDate).toISOString().split('T')[0])));

    const treatmentColorsMap = new Map<string, string>();
    const availableColors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFA500'];
    let colorIndex = 0;

    sortedTrends.forEach(trend => {
      const treatment = trend.treatmentName || 'Non spécifié';
      if (!treatmentColorsMap.has(treatment)) {
        treatmentColorsMap.set(treatment, availableColors[colorIndex % availableColors.length]);
        colorIndex++;
      }
    });

    const cd4Data: (number | null)[] = [];
    this.cd4Treatments = [];

    const viralLoadData: (number | null)[] = [];
    this.viralLoadTreatments = [];

    uniqueDates.forEach(date => {
      const trendsForDate = sortedTrends.filter(t => new Date(t.medicalTestDate).toISOString().split('T')[0] === date);

      const cd4Trend = trendsForDate.find(t => t.cd4Count != null);
      cd4Data.push(cd4Trend?.cd4Count ?? null);
      this.cd4Treatments.push(cd4Trend?.treatmentName ?? 'Non spécifié');

      const viralTrend = trendsForDate.find(t => t.viralLoad != null);
      viralLoadData.push(viralTrend?.viralLoad ?? null);
      this.viralLoadTreatments.push(viralTrend?.treatmentName ?? 'Non spécifié');
    });

    this.lineChartLabels = uniqueDates;

    this.cd4ChartData = [{
      data: cd4Data,
      label: 'CD4',
      tension: 0.4, // line smoothness
      fill: false,
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
      pointRadius: 5,
      pointBackgroundColor: this.getPointColor(this.viralLoadTreatments, treatmentColorsMap),
      segment: {
        borderColor: (ctx) => {
          const i = ctx.p0DataIndex;
          const treatment = this.viralLoadTreatments[i] ?? 'Non spécifié';
          return treatmentColorsMap.get(treatment) ?? '#000';
        }
      }
    }];

    this.treatmentLegend = Array.from(treatmentColorsMap.entries()).map(([name, color]) => ({ name, color }));
  }


  getPointColor(treatments: string[], colorsMap: Map<string, string>) {
    return (ctx: any) => {
      const i = ctx.dataIndex;
      const treatment = treatments[i] ?? 'Non spécifié';
      return colorsMap.get(treatment) ?? '#000';
    };
  }

}
