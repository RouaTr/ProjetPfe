import { Patient } from "./Patient.Entity";

export class MedicalHistory {
  constructor(
    public id?: number,
    public historyType?: string, // Type: Vaccin, Allergie, Médicaux, Familiaux, IST

    // Vaccination
    public vaccineCode?: string,
    public vaccineType?: string,
    public vaccineBatchNumber?: string,
    public vaccineStatus?: string,
    public vaccineDate?: Date,

    // Allergies
    public allergyDiagnosisDate?: Date,
    public allergyType?: string,
    public allergyReaction?: string,
    public allergyMedication?: string,
    public allergyStatus?: string,

    // Medical conditions
    public medicalCondition?: string,
    public medicalDiagnosisDate?: Date,
    public medicalTreatment?: string,
    public medicalTreatmentStartDate?: Date,
    public medicalTreatmentEndDate?: Date,
    public medicalFollowUp?: string,
    public medicalStatus?: string,

    // Family history
    public hereditaryDisease?: string,
    public affectedFamilyMember?: string,
    public familyDiagnosisDate?: Date,
    public familyStatus?: string,

    // Sexually Transmitted Infections (STIs)
    public stiType?: string,
    public stiDiagnosisDate?: Date,
    public stiTreatment?: string,
    public stiTreatmentStartDate?: Date,
    public stiTreatmentEndDate?: Date,
    public stiFollowUp?: string,
    public stiStatus?: string,

    // Relation avec Patient
    public patient?: Patient
  ) {}
  [key: string]: any;
}
