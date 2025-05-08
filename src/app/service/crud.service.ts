import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap, switchMap, map } from 'rxjs';
import { Patient } from '../Entity/Patient.Entity';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observation } from '../Entity/Observation.Entity';
import { FunctionalSymptoms } from '../Entity/FunctionalSymptoms.Entity';
import { MedicalHistory } from '../Entity/MedicalHistory.Entity';
import { ClinicalSymptoms } from '../Entity/ClinicalSymptoms.Entity';
import { Laboratory } from '../Entity/Laboratory.Entity';
import { MedicalTreatment } from '../Entity/MedicalTreatment.Entity';
import { Practitionner} from '../Entity/Practitionner.Entity';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TreatmentPredictionDTO } from '../Entity/TreatmentPredictionDTO';
import { MedicalDocument } from '../Entity/MedicalDocument.Entity';

interface FileNetResponse {
  id?: number;
  fileNetId?: string;
  title?: string;
  documentType?: string;
  message?: string;
  error?: string;
}

export interface Document {
  id: number;
  title: string;
  documentType: string;
  fileNetId: string;
  uploadDate: Date;
  fileName: string;
  fileType: string;
}

interface FileNetUploadResponse {
  success: boolean;
  message: string;
  documentId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  apiUrl = 'http://localhost:8081/api';
  loginUserUrl='http://localhost:8081/api/practitionner/login';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  //  **Gestion des Patients**

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }


  addPatient(patientData: any, practitionnerEmail: string): Observable<any> {
    const url =  `http://localhost:8081/api/patients?practitionnerEmail=${practitionnerEmail}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(url, patientData, { headers });
  }
  getPatientsByPractitionner(practitionnerEmail: string): Observable<any> {
    const params = new HttpParams().set('practitionnerEmail', practitionnerEmail);
    return this.http.get(`${this.apiUrl}/patients/by-practitionner`, { params });
  }





  updatePatient(id: number, patient: Patient, practitionnerEmail: string): Observable<Patient> {
    const url = `http://localhost:8081/api/patients/${id}?practitionnerEmail=${practitionnerEmail}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Patient>(url, patient, { headers });
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
  addMedicalTreatment(patientId: number, medicaltreatment: MedicalTreatment): Observable<MedicalTreatment> {
    const url = `${this.apiUrl}/medicaltreatment?patientId=${patientId}`;
    return this.http.post<MedicalTreatment>(url, medicaltreatment);
  }

  updateMedicalTreatment(id: number, patientId: number,medicaltreatment: MedicalTreatment): Observable<MedicalTreatment> {
    const url = `${this.apiUrl}/medicaltreatment/${id}?patientId=${patientId}`;
    return this.http.put<MedicalTreatment>(url, medicaltreatment);
  }
  findMedicalTreatmentById(id: number): Observable<MedicalTreatment> {
    return this.http.get<MedicalTreatment>(`${this.apiUrl}/medicaltreatment/${id}`);
  }


  getMedicalTreatment(): Observable<MedicalTreatment[]> {
    return this.http.get<MedicalTreatment[]>(`${this.apiUrl}/medicaltreatment`);
  }
  getMedicalTreatmentByPatientId(patientId: number): Observable<MedicalTreatment[]> {
    return this.http.get<MedicalTreatment[]>(`${this.apiUrl}/medicaltreatment/patient/${patientId}`);
  }
  addPharmacyTreatment(data: any) {
    return this.http.post('/medicaltreatment', data); // ou le bon endpoint côté backend
  }




generateOrdonnance(patientId: number): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/report/ordonnance/${patientId}`, { responseType: 'blob' });
}
//  **Gestion practitionner**


addPractitionner(practitionner:Practitionner):Observable<Practitionner>
{
 return this.http.post<any>(this.apiUrl+"/practitionner",practitionner);
}


getPractitionner(): Observable<Practitionner[]> {
  return this.http.get<Practitionner[]>(`${this.apiUrl}/practitionner`);
}

updatePractitionner(id: number, practitionner: Practitionner) {
  console.log('=== DÉBUT MISE À JOUR PRATICIEN ===');
  console.log('ID du praticien à mettre à jour:', id);
  console.log('Données reçues:', {
    ...practitionner,
    password: '***'
  });

  // Supprimer le champ password avant l'envoi
  const updatedPractitionner = { ...practitionner };
  delete updatedPractitionner.password;

  console.log('Données envoyées au serveur (sans mot de passe):', updatedPractitionner);
  console.log('URL de la requête:', `${this.apiUrl}/practitionner/${id}`);

  return this.http.put<any>(`${this.apiUrl}/practitionner/${id}`, updatedPractitionner).pipe(
    tap(response => {
      console.log('=== RÉPONSE DU SERVEUR ===');
      console.log('Statut: Succès');
      console.log('Données reçues:', response);
      console.log('=== FIN MISE À JOUR PRATICIEN ===');
    }),
    catchError(error => {
      console.error('=== ERREUR LORS DE LA MISE À JOUR ===');
      console.error('Statut:', error.status);
      console.error('Message:', error.error?.message || error.message);
      console.error('Détails complets:', error);
      console.error('=== FIN ERREUR ===');
      throw error;
    })
  );
}

findPractitionnerById(id: number): Observable<Practitionner> {
  return this.http.get<Practitionner>(`${this.apiUrl}/practitionner/${id}`);
}
doesPractitionnerExists(practitionnerLastName: string, practitionnerFirstName: string) {
  return this.http.get<boolean>(`${this.apiUrl}/practitionner/exists?practitionnerLastName=${practitionnerLastName}&practitionnerFirstName=${practitionnerFirstName}`);
}
loginPractitionner(practitionner: Practitionner) {
  console.log('Tentative de connexion pour:', practitionner.practitionnerEmail);

  // Créer un nouvel objet avec les données de connexion
  const loginData = {
    practitionnerEmail: practitionner.practitionnerEmail,
    password: practitionner.password
  };

  console.log('Données envoyées:', {
    email: loginData.practitionnerEmail,
    password: '******'
  });

  return this.http.post<any>(this.loginUserUrl, loginData).pipe(
    tap(response => {
      console.log('Réponse de connexion réussie:', {
        token: response.token ? 'Présent' : 'Absent',
        role: response.practitionnerRole,
        message: response.message
      });

      if (response.token) {
        localStorage.setItem("myToken", response.token);
        localStorage.setItem("practitionnerRole", response.practitionnerRole);
        console.log('Token et rôle sauvegardés dans localStorage');
      } else {
        console.warn('Pas de token reçu dans la réponse');
      }
    }),
    catchError(error => {
      console.error('Erreur de connexion détaillée:', {
        status: error.status,
        message: error.error?.message || error.message,
        error: error
      });

      if (error.status === 403) {
        throw new Error('Compte en attente d\'activation par l\'administrateur');
      } else if (error.status === 404) {
        throw new Error('Email ou mot de passe incorrect');
      } else if (error.status === 0) {
        throw new Error('Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.');
      } else {
        throw new Error(error.error?.message || 'Une erreur est survenue lors de la connexion');
      }
    })
  );
}
getPendingPractitionners() {
  return this.http.get<any[]>(`http://localhost:8081/api/practitionner?status=pending`);
}

updatePractitionnerRole(id: number, role: string) {
  const url = `http://localhost:8081/api/practitionner/${id}/role`;
  const params = { newRole: role };  // Ajouter 'newRole' en tant que paramètre dans l'URL
  return this.http.put(url, null, { params });  // Utilisation de 'params' au lieu de 'body'
}





getUserInfo() {
  const token = localStorage.getItem('myToken');
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log('Token décodé:', decodedToken);

    // Enregistrer l'email et d'autres détails dans localStorage
    localStorage.setItem('practitionnerEmail', decodedToken.practitionnerEmail);
    localStorage.setItem('userDetails', JSON.stringify(decodedToken)); // Optionnel: stocker l'objet entier

    console.log('Détails de l\'utilisateur:', decodedToken);
    return decodedToken;
  }
  return null;
}

isLoggedIn(){

  let token = localStorage.getItem("myToken");

  if (token) {
    return true ;
  } else {
    return false;
  }
}
requestPasswordReset(email: string): Observable<any> {
  return this.http.post<any>(
    `${this.apiUrl}/practitionner/forgot-password`,
    { email }
  );
}

resetPassword(token: string, newPassword: string): Observable<any> {
  const url = `${this.apiUrl}/practitionner/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`;
  return this.http.post<any>(url, {}, { headers: { 'Content-Type': 'application/json' } });
}

validatePractitionner(id: number, newRole: string) {
  const url = `${this.apiUrl}/practitionner/${id}/validate`;
  const params = { newRole };
  return this.http.put(url, null, { params, responseType: 'text' });
}

private getPractitionnerIdFromToken(): number {
  const token = localStorage.getItem('myToken');
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.id;
  }
  return null;
}

getTrendsForPatient(patientId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/laboratory/trends/patients/${patientId}`);
}

getAllTreatmentOptions(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/treatment-options`);
}

addTreatmentOption(treatmentName: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/treatment-options`, treatmentName);
}

updateTreatmentOption(id: number, treatmentName: string): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/treatment-options/${id}`, treatmentName);
}

deleteTreatmentOption(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/treatment-options/${id}`);
}



predictFromLatestDataById(patientId: number) {
  return this.http.get<TreatmentPredictionDTO>(`${this.apiUrl}/ai/prediction/by-id/${patientId}`);
}



getDocumentsByPatientIdAndType(patientId: number, documentType: string) {
  return this.http.get(`${this.apiUrl}/filenet/patient/${patientId}/type/${documentType}`);
}
uploadFile(file: File, title: string, patientId: number, type: string, saveDate: any): Observable<any> {
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('title', title);
  formData.append('patientId', patientId.toString());
  formData.append('type', type);

  const dateObj = new Date(saveDate);
  const formattedDate = dateObj.toISOString().split('T')[0]; 
  formData.append('saveDate', formattedDate);
  const headers = new HttpHeaders();
  const url = `${this.apiUrl}/filenet/upload`;

  return this.http.post(url, formData, { headers, responseType: 'text' });
}


downloadDocument(fileNetId: string): void {
  const url = `${this.apiUrl}/filenet/download/${fileNetId}`;
  window.open(url, '_blank');
}
getDocumentsByPatientId(patientId: number): Observable<MedicalDocument[]> {
  return this.http.get<MedicalDocument[]>(`${this.apiUrl}/filenet/documents/patient/${patientId}`);
}
}
