import { Patient } from "./Patient.Entity";

export class FunctionalSymptoms {
  constructor(
    public id?: number,
    public fever?: boolean,
    public diarrhea?: boolean,
    public cough?: boolean,
    public abdominalPain?: boolean,
    public dyspnea?: boolean,
    public nausea?: boolean,
    public asthenia?: boolean,
    public arthralgia?: boolean,
    public nightSweats?: boolean,
    public headache?: boolean,
    public dysphagia?: boolean,
    public pruritus?: boolean,
    public anorexia?: boolean,
    public insomnia?: boolean,
    public moodDisorders?: boolean,
    public rhinorrhea?: boolean,
    public paresthesia?: boolean,
    public cramps?: boolean,
    public visualDisturbances?: boolean,
    public myalgia?: boolean,
    public libidoDisorders?: boolean,
    public otherSymptoms?: boolean,
    public functionalSymptomsDate?:Date,
    public patient?: Patient

  ) {}
}
