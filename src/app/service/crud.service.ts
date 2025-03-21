import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../Entity/Patient.Entity';
import { HttpClient } from '@angular/common/http';
import { Observation } from '../Entity/Observation.Entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  //  **Gestion des Patients**
  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${id}`, patient);
  }

  findPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${id}`);
  }

  //  **Gestion des Observations**
  addObservation(patientId: number, observation: Observation): Observable<Observation> {
    return this.http.post<Observation>(`${this.apiUrl}/observations?patientId=${patientId}`, observation);
  }


  getObservations(): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.apiUrl}/observations`);
  }

  updateObservation(id: number, observation: Observation): Observable<Observation> {
    return this.http.put<Observation>(`${this.apiUrl}/observations/${id}`, observation);
  }

  findObservationById(id: number): Observable<Observation> {
    return this.http.get<Observation>(`${this.apiUrl}/observations/${id}`);
  }
}
