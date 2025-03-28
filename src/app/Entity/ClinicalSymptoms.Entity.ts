import { Patient } from "./Patient.Entity";

export class ClinicalSymptoms {
  constructor(
    public id?: number,
    public generalSigns?: string,
    public dermatological?: string,
    public neuroMuscular?: string,
    public ent?: string,
    public psychiatric?: string,
    public cardiovascular?: string,
    public digestive?: string,
    public lipodystrophy?: string,
    public genitourinary?: string,
    public ophthalmological?: string,
    public pulmonary?: string,
    public puberty?: string,
    public clinicalSymptomsDate?: Date,
    public patient?: Patient
  ) {}
}
