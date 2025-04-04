import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../Entity/Patient.Entity';
import { HttpClient } from '@angular/common/http';
import { Observation } from '../Entity/Observation.Entity';
import { FunctionalSymptoms } from '../Entity/FunctionalSymptoms.Entity';
import { MedicalHistory } from '../Entity/MedicalHistory.Entity';
import { ClinicalSymptoms } from '../Entity/ClinicalSymptoms.Entity';
import { Laboratory } from '../Entity/Laboratory.Entity';
import { MedicalTreatment } from '../Entity/MedicalTreatment.Entity';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  //  **Gestion des Patients**

  addPatient(patient: Patient): Observable<Patient> {
    console.log("Patient envoyé :", patient);
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
  doesPatientExists(lastName: string, firstName: string) {
    return this.http.get<boolean>(`${this.apiUrl}/patients/exists?lastName=${lastName}&firstName=${firstName}`);
  }


  //  **Gestion des Observations**

  addObservation(patientId: number, observation: Observation): Observable<Observation> {
    const url = `${this.apiUrl}/observations?patientId=${patientId}`;
    return this.http.post<Observation>(url, observation);
  }

  updateObservation(id: number, patientId: number, observation: Observation): Observable<Observation> {
    const url = `${this.apiUrl}/observations/${id}?patientId=${patientId}`;
    return this.http.put<Observation>(url, observation);
  }
  findObservationById(id: number): Observable<Observation> {
    return this.http.get<Observation>(`${this.apiUrl}/observations/${id}`);
  }


  getObservations(): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.apiUrl}/observations`);
  }
  getObservationsByPatientId(patientId: number): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.apiUrl}/observations/patient/${patientId}`);
  }
 //  **Gestion des Signes Fonctionnels**

 addFunctionalSymptoms(patientId: number, functionalsymptoms: FunctionalSymptoms): Observable<FunctionalSymptoms> {
  const url = `${this.apiUrl}/functionalsymptoms?patientId=${patientId}`;
  console.log(url);

  return this.http.post<FunctionalSymptoms>(url, functionalsymptoms);
}

updateFunctionalSymptoms(id: number, patientId: number, functionalsymptoms: FunctionalSymptoms): Observable<FunctionalSymptoms> {
  const url = `${this.apiUrl}/functionalsymptoms/${id}?patientId=${patientId}`;
  return this.http.put<FunctionalSymptoms>(url, functionalsymptoms);
}
findFunctionalSymptomsById(id: number): Observable<FunctionalSymptoms> {
  return this.http.get<FunctionalSymptoms>(`${this.apiUrl}/functionalsymptoms/${id}`);
}


getFunctionalSymptoms(): Observable<FunctionalSymptoms[]> {
  return this.http.get<FunctionalSymptoms[]>(`${this.apiUrl}/functionalsymptoms`);
}
getFunctionalSymptomsByPatientId(patientId: number): Observable<FunctionalSymptoms[]> {
  return this.http.get<FunctionalSymptoms[]>(`${this.apiUrl}/functionalsymptoms?patientId=${patientId}`);
}
//  **Gestion des antécédants**
addMedicalHistory(patientId: number, medicalhistory: MedicalHistory): Observable<MedicalHistory> {
  const url = `${this.apiUrl}/medicalHistories?patientId=${patientId}`;
  console.log(url);
  console.log("Données médicales envoyées :", medicalhistory);

  return this.http.post<MedicalHistory>(url, medicalhistory);
}

updateMedicalHistory(id: number, patientId: number, medicalhistory: MedicalHistory): Observable<MedicalHistory> {
  const url = `${this.apiUrl}/medicalHistories/${id}?patientId=${patientId}`;
  return this.http.put<MedicalHistory>(url, medicalhistory);
}
findMedicalHistoryById(id: number): Observable<MedicalHistory> {
  return this.http.get<MedicalHistory>(`${this.apiUrl}/medicalHistories/${id}`);
}


getMedicalHistory(): Observable<MedicalHistory[]> {
  return this.http.get<MedicalHistory[]>(`${this.apiUrl}/medicalHistories`);
}
getMedicalHistoryByPatientId(patientId: number): Observable<MedicalHistory[]> {
  return this.http.get<MedicalHistory[]>(`${this.apiUrl}/medicalHistories?patientId=${patientId}`);
}
//  **Gestion des signes cliniques**
addClinicalSymptoms(patientId: number, clinicalsymptoms: ClinicalSymptoms): Observable<ClinicalSymptoms> {
  const url = `${this.apiUrl}/clinicalsymptoms?patientId=${patientId}`;
  console.log(url);
  console.log("Données médicales envoyées :", clinicalsymptoms);

  return this.http.post<ClinicalSymptoms>(url, clinicalsymptoms);
}

updateClinicalSymptoms(id: number, patientId: number, clinicalsymptoms: ClinicalSymptoms): Observable<ClinicalSymptoms> {
  const url = `${this.apiUrl}/clinicalsymptoms/${id}?patientId=${patientId}`;
  return this.http.put<ClinicalSymptoms>(url, clinicalsymptoms);
}
findClinicalSymptomsById(id: number): Observable<ClinicalSymptoms> {
  return this.http.get<ClinicalSymptoms>(`${this.apiUrl}/clinicalsymptoms/${id}`);
}


getClinicalSymptoms(): Observable<ClinicalSymptoms[]> {
  return this.http.get<ClinicalSymptoms[]>(`${this.apiUrl}/clinicalsymptoms`);
}
getClinicalSymptomsByPatientId(patientId: number): Observable<ClinicalSymptoms[]> {
  return this.http.get<ClinicalSymptoms[]>(`${this.apiUrl}/clinicalsymptoms?patientId=${patientId}`);
}
  //  **Gestion des Bilans**

  addLaboratory(patientId: number, laboratory: Laboratory): Observable<Laboratory> {
    const url = `${this.apiUrl}/laboratory?patientId=${patientId}`;
    return this.http.post<Laboratory>(url, laboratory);
  }

  updateLaboratory(id: number, patientId: number,laboratory: Laboratory): Observable<Laboratory> {
    const url = `${this.apiUrl}/laboratory/${id}?patientId=${patientId}`;
    return this.http.put<Laboratory>(url, laboratory);
  }
  findLaboratoryById(id: number): Observable<Laboratory> {
    return this.http.get<Laboratory>(`${this.apiUrl}/laboratory/${id}`);
  }


  getLaboratory(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(`${this.apiUrl}/laboratory`);
  }
  getLaboratoryByPatientId(patientId: number): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(`${this.apiUrl}/laboratory/patient/${patientId}`);
  }
  //  **Gestion des Traitements**
  addMedicalTreatment(patientId: number, medicaltratment: MedicalTreatment): Observable<MedicalTreatment> {
    const url = `${this.apiUrl}/medicaltratment?patientId=${patientId}`;
    return this.http.post<MedicalTreatment>(url, medicaltratment);
  }

  updateMedicalTreatment(id: number, patientId: number,medicaltratment: MedicalTreatment): Observable<MedicalTreatment> {
    const url = `${this.apiUrl}/medicaltratment/${id}?patientId=${patientId}`;
    return this.http.put<MedicalTreatment>(url, medicaltratment);
  }
  findMedicalTreatmentById(id: number): Observable<MedicalTreatment> {
    return this.http.get<MedicalTreatment>(`${this.apiUrl}/medicaltratment/${id}`);
  }


  getMedicalTreatment(): Observable<MedicalTreatment[]> {
    return this.http.get<MedicalTreatment[]>(`${this.apiUrl}/medicaltratment`);
  }
  getMedicalTreatmentByPatientId(patientId: number): Observable<MedicalTreatment[]> {
    return this.http.get<MedicalTreatment[]>(`${this.apiUrl}/medicaltratment/patient/${patientId}`);
  }



}
