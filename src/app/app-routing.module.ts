import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { CliniaclSymptomsComponent } from './cliniacl-symptoms/cliniacl-symptoms.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { FonctionnalSymptomsComponent } from './fonctionnal-symptoms/fonctionnal-symptoms.component';
import { ObservationComponent } from './observation/observation.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { ListObservationComponent } from './list-observation/list-observation.component';
import { MedicalFolderComponent } from './medical-folder/medical-folder.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { UpdateObservationComponent } from './update-observation/update-observation.component';
import { ListFunctionalSymptomsComponent } from './list-functional-symptoms/list-functional-symptoms.component';
import { UpdateFunctionalSymptomsComponent } from './update-functional-symptoms/update-functional-symptoms.component';
import { ListMedicalHistoryComponent } from './list-medical-history/list-medical-history.component';
import { UpdateMedicalHistoryComponent } from './update-medical-history/update-medical-history.component';
import { ListClinicalSymptomsComponent } from './list-clinical-symptoms/list-clinical-symptoms.component';
import { UpdateClinicalSymptomsComponent } from './update-clinical-symptoms/update-clinical-symptoms.component';
import { ListLaboratoryComponent } from './list-laboratory/list-laboratory.component';
import { UpdateLaboratoryComponent } from './update-laboratory/update-laboratory.component';
import { AddMedicalTreatmentComponent } from './add-medical-treatment/add-medical-treatment.component';
import { UpdateMedicalTreatmentComponent } from './update-medical-treatment/update-medical-treatment.component';
import { ListMedicalTreatmentComponent } from './list-medical-treatment/list-medical-treatment.component';
import { UpdateTreatmentByPharmacyComponent } from './update-treatment-by-pharmacy/update-treatment-by-pharmacy.component';
import { ListOfMedicalPrescriptionsComponent } from './list-of-medical-prescriptions/list-of-medical-prescriptions.component';
import { AddPractitionnerComponent } from './add-practitionner/add-practitionner.component';

import { AuthGuard } from './service/Auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { ManagePractitionnerAccessComponent } from './manage-practitionner-access/manage-practitionner-access.component';
import { UpdatePractitionnerComponent } from './update-practitionner/update-practitionner.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate:[AuthGuard] ,data: { role: 'medecin' } },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  {path:'newpatient',component:AddPatientComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path:'listpatient',component:ListPatientsComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},

  {path:'medicalfolder/:id',component:MedicalFolderComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path:'updatePatient/:id',component:UpdatePatientComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},

  {path:'laboratory',component:LaboratoryComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
//observation
  {path:'observation',component:ObservationComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path:'listobservation',component:ListObservationComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path: 'medicalfolder/listobservation/updateobservation/:id',component:UpdateObservationComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},

  {path:'medicalfolder/listobservation/:patientId',component:ListObservationComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path: 'medicalfolder/listobservation/:patientId/add', component: ObservationComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {
    path: 'observation/:patientId',
    component: ObservationComponent,canActivate:[AuthGuard],data: { role: 'medecin' }
  },
//functSymptoms
  {path:'functionalsymptoms',component:FonctionnalSymptomsComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path: 'medicalfolder/listfunctionalsymptoms/updatefunctionalsymptoms/:id',component:UpdateFunctionalSymptomsComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {
    path: 'functionalsymptoms/:patientId',
    component: FonctionnalSymptomsComponent,canActivate:[AuthGuard],data: { role: 'medecin' }
  },
  { path: 'medicalfolder/listfunctionalsymptoms/:patientId', component: ListFunctionalSymptomsComponent ,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path:'listfunctionalsymptoms',component:ListFunctionalSymptomsComponent,data: { role: 'medecin' }},
  { path: 'medicalfolder/listfunctionalsymptoms/:patientId/add', component: FonctionnalSymptomsComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
//MedHistory
  {path:'medicalhistory',component:MedicalHistoryComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path: 'medicalfolder/listmedicalhistory/updatemedicalhistory/:id',component:UpdateMedicalHistoryComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},

  { path: 'medicalfolder/listmedicalhistory/:patientId', component: ListMedicalHistoryComponent ,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path:'listmedicalhistory',component:ListMedicalHistoryComponent},
  { path: 'medicalfolder/listmedicalhistory/:patientId/add', component: MedicalHistoryComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {
    path: 'medicalhistory/:patientId',
    component: MedicalHistoryComponent,canActivate:[AuthGuard],data: { role: 'medecin' }
  },
//clinicalSymptoms
{path:'clinicalsymptoms',component:CliniaclSymptomsComponent},
{path: 'medicalfolder/listclinicalsymptoms/updateclinicalsymptoms/:id',component:UpdateClinicalSymptomsComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},

  { path: 'medicalfolder/listclinicalsymptoms/:patientId', component: ListClinicalSymptomsComponent,canActivate:[AuthGuard],data: { role: 'medecin' } },
  {path:'listclinicalsymptoms',component:ListClinicalSymptomsComponent},
  { path: 'medicalfolder/listclinicalsymptoms/:patientId/add', component: CliniaclSymptomsComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {
    path: 'clinicalsymptoms/:patientId',
    component: CliniaclSymptomsComponent,canActivate:[AuthGuard],data: { role: 'medecin' }
  },
  //laboratory
{path: 'medicalfolder/listlaboratory/updatelaboratory/:id',component:UpdateLaboratoryComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},

  { path: 'medicalfolder/listlaboratory/:patientId', component: ListLaboratoryComponent ,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {path:'listlaboratory',component:ListLaboratoryComponent},
  { path: 'medicalfolder/listlaboratory/:patientId/add', component: LaboratoryComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  {
    path: 'laboratory/:patientId',
    component: LaboratoryComponent,canActivate:[AuthGuard],data: { role: 'medecin' }
  },
   //traitement
{path:'medicaltreatment',component:AddMedicalTreatmentComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
{path: 'medicalfolder/listmedicaltreatment/updatemedicaltreatment/:id',component:UpdateMedicalTreatmentComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
{
  path: 'medicaltreatment/:patientId',
  component: AddMedicalTreatmentComponent,canActivate:[AuthGuard],data: { role: 'medecin' }
},

  { path: 'listmedicaltreatment/:patientId', component: ListMedicalTreatmentComponent,canActivate:[AuthGuard] ,data: { role: 'medecin' }},
  {path:'listmedicaltreatment',component:ListMedicalTreatmentComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  { path: 'listmedicaltreatment/:patientId/add', component: AddMedicalTreatmentComponent,canActivate:[AuthGuard],data: { role: 'medecin' }},
  //pharmacie
  {path:'listofmedicalprescriptions',component:ListOfMedicalPrescriptionsComponent ,canActivate:[AuthGuard],data: { role: 'pharmacien' }},

  { path: 'listofmedicalprescriptions/:patientId', component: ListOfMedicalPrescriptionsComponent,canActivate:[AuthGuard],data: { role: 'pharmacien' } },
  { path: 'updatetreatmentbypharmacie/:treatmentId', component: UpdateTreatmentByPharmacyComponent,canActivate:[AuthGuard],data: { role: 'pharmacien' } },

//Login/register
{ path: 'addPractitionner', component: AddPractitionnerComponent },
{ path: 'updatePractitionner/:id', component: UpdatePractitionnerComponent },
{ path: '', component: LoginComponent },
{ path: 'manageaccess', component: ManagePractitionnerAccessComponent, canActivate:[AuthGuard] ,data: { role: 'admin' }},








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
