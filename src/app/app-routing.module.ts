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
import { AddPharmacistComponent } from './add-pharmacist/add-pharmacist.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/Auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'forgortPassword',component:ForgotPasswordComponent},
  {path:'resetPassword',component:ResetPasswordComponent},

  {path:'newpatient',component:AddPatientComponent,canActivate:[AuthGuard]},
  {path:'listpatient',component:ListPatientsComponent,canActivate:[AuthGuard]},

  {path:'medicalfolder/:id',component:MedicalFolderComponent,canActivate:[AuthGuard]},
  {path:'updatePatient/:id',component:UpdatePatientComponent,canActivate:[AuthGuard]},

  {path:'laboratory',component:LaboratoryComponent,canActivate:[AuthGuard]},
//observation
  {path:'observation',component:ObservationComponent,canActivate:[AuthGuard]},
  {path:'listobservation',component:ListObservationComponent,canActivate:[AuthGuard]},
  {path: 'medicalfolder/listobservation/updateobservation/:id',component:UpdateObservationComponent,canActivate:[AuthGuard]},

  {path:'medicalfolder/listobservation/:patientId',component:ListObservationComponent,canActivate:[AuthGuard]},
  {path: 'medicalfolder/listobservation/:patientId/add', component: ObservationComponent,canActivate:[AuthGuard]},
  {
    path: 'observation/:patientId',
    component: ObservationComponent,canActivate:[AuthGuard]
  },
//functSymptoms
  {path:'functionalsymptoms',component:FonctionnalSymptomsComponent,canActivate:[AuthGuard]},
  {path: 'medicalfolder/listfunctionalsymptoms/updatefunctionalsymptoms/:id',component:UpdateFunctionalSymptomsComponent,canActivate:[AuthGuard]},
  {
    path: 'functionalsymptoms/:patientId',
    component: FonctionnalSymptomsComponent,canActivate:[AuthGuard]
  },
  { path: 'medicalfolder/listfunctionalsymptoms/:patientId', component: ListFunctionalSymptomsComponent ,canActivate:[AuthGuard]},
  {path:'listfunctionalsymptoms',component:ListFunctionalSymptomsComponent},
  { path: 'medicalfolder/listfunctionalsymptoms/:patientId/add', component: FonctionnalSymptomsComponent,canActivate:[AuthGuard]},
//MedHistory
  {path:'medicalhistory',component:MedicalHistoryComponent,canActivate:[AuthGuard]},
  {path: 'medicalfolder/listmedicalhistory/updatemedicalhistory/:id',component:UpdateMedicalHistoryComponent,canActivate:[AuthGuard]},

  { path: 'medicalfolder/listmedicalhistory/:patientId', component: ListMedicalHistoryComponent ,canActivate:[AuthGuard]},
  {path:'listmedicalhistory',component:ListMedicalHistoryComponent},
  { path: 'medicalfolder/listmedicalhistory/:patientId/add', component: MedicalHistoryComponent,canActivate:[AuthGuard]},
  {
    path: 'medicalhistory/:patientId',
    component: MedicalHistoryComponent,canActivate:[AuthGuard]
  },
//clinicalSymptoms
{path:'clinicalsymptoms',component:CliniaclSymptomsComponent},
{path: 'medicalfolder/listclinicalsymptoms/updateclinicalsymptoms/:id',component:UpdateClinicalSymptomsComponent,canActivate:[AuthGuard]},

  { path: 'medicalfolder/listclinicalsymptoms/:patientId', component: ListClinicalSymptomsComponent,canActivate:[AuthGuard] },
  {path:'listclinicalsymptoms',component:ListClinicalSymptomsComponent},
  { path: 'medicalfolder/listclinicalsymptoms/:patientId/add', component: CliniaclSymptomsComponent,canActivate:[AuthGuard]},
  {
    path: 'clinicalsymptoms/:patientId',
    component: CliniaclSymptomsComponent,canActivate:[AuthGuard]
  },
  //laboratory
{path:'laboratory',component:LaboratoryComponent,canActivate:[AuthGuard]},
{path: 'medicalfolder/listlaboratory/updatelaboratory/:id',component:UpdateLaboratoryComponent,canActivate:[AuthGuard]},

  { path: 'medicalfolder/listlaboratory/:patientId', component: ListLaboratoryComponent ,canActivate:[AuthGuard]},
  {path:'listlaboratory',component:ListLaboratoryComponent},
  { path: 'medicalfolder/listlaboratory/:patientId/add', component: LaboratoryComponent,canActivate:[AuthGuard]},
  {
    path: 'laboratory/:patientId',
    component: LaboratoryComponent,canActivate:[AuthGuard]
  },
   //traitement
{path:'medicaltreatment',component:AddMedicalTreatmentComponent,canActivate:[AuthGuard]},
{path: 'medicalfolder/listmedicaltreatment/updatemedicaltreatment/:id',component:UpdateMedicalTreatmentComponent,canActivate:[AuthGuard]},
{
  path: 'medicaltreatment/:patientId',
  component: AddMedicalTreatmentComponent,canActivate:[AuthGuard]
},

  { path: 'listmedicaltreatment/:patientId', component: ListMedicalTreatmentComponent,canActivate:[AuthGuard] },
  {path:'listmedicaltreatment',component:ListMedicalTreatmentComponent,canActivate:[AuthGuard]},
  { path: 'listmedicaltreatment/:patientId/add', component: AddMedicalTreatmentComponent,canActivate:[AuthGuard]},
  //pharmacie
  {path:'listofmedicalprescriptions',component:ListOfMedicalPrescriptionsComponent},

  { path: 'listofmedicalprescriptions/:patientId', component: ListOfMedicalPrescriptionsComponent },
  { path: 'updatetreatmentbypharmacie/:treatmentId', component: UpdateTreatmentByPharmacyComponent },

//Login/register
{ path: 'addPractitionner', component: AddPractitionnerComponent },
{ path: 'addPharmacist', component: AddPharmacistComponent },
{ path: 'login', component: LoginComponent },








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
