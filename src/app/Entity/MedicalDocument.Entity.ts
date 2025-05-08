import { Patient } from "./Patient.Entity";

export class MedicalDocument {
  constructor(
    public id: number,

    public fileNetId: string,

    public type: string,
    public patient: Patient,
    public patientName: string,
    public saveDate?: Date
  ) {}

  isOrdonnance(): boolean {
    return this.type === 'Ordonnance';
  }
}
