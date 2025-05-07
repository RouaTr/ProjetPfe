export class TreatmentPredictionDTO {
  medicalRecordNumber: string;
  viralLoad: number;
  cd4Count: number;
  treatmentName: string;
  effective: boolean;
  suggestedTreatment: string;
  labDate: Date;
  constructor(
    medicalRecordNumber: string,
    viralLoad: number,
    cd4Count: number,
    treatmentName: string,
    effective: boolean,
    suggestedTreatment: string,
    labDate: Date
  ) {
    this.medicalRecordNumber = medicalRecordNumber;
    this.viralLoad = viralLoad;
    this.cd4Count = cd4Count;
    this.treatmentName = treatmentName;
    this.effective = effective;
    this.suggestedTreatment = suggestedTreatment;
    this.labDate=labDate;
  }
}
