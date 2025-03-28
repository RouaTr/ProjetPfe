import { Patient } from "./Patient.Entity";

export class Observation {
  constructor(
    public id?: number,
    public observationDate?: Date,
    public observationDetails?: string,
    public patient?: Patient) {}
}
