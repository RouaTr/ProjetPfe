import { MedicalTreatment } from "./MedicalTreatment.Entity";
import { Practitionner } from "./Practitionner.Entity";

export class Patient {
  constructor(
    public id?: number,
    public medicalRecordNumber?: string,
    public lastName?: string,
    public firstName?: string,
    public birthDate?: Date,
    public gender?: string,
    public phoneNumber?: string,

    public city?: string,
    public region?: string,
    public postalCode?: string,
    public address?: string,
    public nationality?: string,
    public weight?: number,
    public height?: number,
    public maritalStatus?: string,
    public children?: number,
    public housing?: string,
    public housingType?: string,
    public educationLevel?: string,
    public smoking?: boolean,
    public alcohol?: boolean,
    public drugUse?: boolean,
    public physicalActivity?: boolean,
    public bodyTemperature?: number,
    public heartRate?: number,
    public bloodPressure?: string,
    public contaminationMode?: string,
    public initialScreeningType?: string,
    public initialScreeningReason?: string,
    public lastNegativeDate?: Date,
    public positiveHIVDate?: Date,
    public hlaB5701Typing?: string,
    public screeningCircumstance?: string,
    public viralType?: string,
    public age_at_HIV_diagnosis?: number,
    public contaminationDate?: Date,
    public cdcStage?: string
  ) {}
  treatments?: MedicalTreatment[];
  latestTreatment?: MedicalTreatment;
  nextIntakeColor?: string;
  practitionner?: Practitionner;
}

