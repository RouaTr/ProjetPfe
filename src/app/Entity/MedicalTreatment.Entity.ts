import { Patient } from "./Patient.Entity";

export class MedicalTreatment {
  constructor(
    public treatmentId?: number,
    public treatmentName?: string,
    public treatmentStartDate?: Date,
    public treatment_intake_duration?: number,
    public next_intake_Date?: Date,
    public duration_of_visual_loss?: number,
    public status?: string,
    public treatmentRegistrationDate?: Date,
    public  delivered?: boolean,
    public patient?: Patient
  ) {}
}
