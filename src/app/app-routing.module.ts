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

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'newpatient',component:AddPatientComponent},
  {path:'listpatient',component:ListPatientsComponent},

  {path:'medicalfolder/:id',component:MedicalFolderComponent},
  {path:'updatePatient/:id',component:UpdatePatientComponent},

  {path:'laboratory',component:LaboratoryComponent},
//observation
  {path:'observation',component:ObservationComponent},
  {path:'listobservation',component:ListObservationComponent},
  {path: 'medicalfolder/listobservation/updateobservation/:id',component:UpdateObservationComponent},

  {path:'medicalfolder/listobservation/:patientId',component:ListObservationComponent},
  {path: 'medicalfolder/listobservation/:patientId/add', component: ObservationComponent},

//functSymptoms
  {path:'functionalsymptoms',component:FonctionnalSymptomsComponent},
  {path: 'medicalfolder/listfunctionalsymptoms/updatefunctionalsymptoms/:id',component:UpdateFunctionalSymptomsComponent},

  { path: 'medicalfolder/listfunctionalsymptoms/:patientId', component: ListFunctionalSymptomsComponent },
  {path:'listfunctionalsymptoms',component:ListFunctionalSymptomsComponent},
  { path: 'medicalfolder/listfunctionalsymptoms/:patientId/add', component: FonctionnalSymptomsComponent},
//MedHistory
  {path:'medicalhistory',component:MedicalHistoryComponent},
  {path: 'medicalfolder/listmedicalhistory/updatemedicalhistory/:id',component:UpdateMedicalHistoryComponent},

  { path: 'medicalfolder/listmedicalhistory/:patientId', component: ListMedicalHistoryComponent },
  {path:'listmedicalhistory',component:ListMedicalHistoryComponent},
  { path: 'medicalfolder/listmedicalhistory/:patientId/add', component: MedicalHistoryComponent},

//clinicalSymptoms
{path:'clinicalsymptoms',component:CliniaclSymptomsComponent},
{path: 'medicalfolder/listclinicalsymptoms/updateclinicalsymptoms/:id',component:UpdateClinicalSymptomsComponent},

  { path: 'medicalfolder/listclinicalsymptoms/:patientId', component: ListClinicalSymptomsComponent },
  {path:'listclinicalsymptoms',component:ListClinicalSymptomsComponent},
  { path: 'medicalfolder/listclinicalsymptoms/:patientId/add', component: CliniaclSymptomsComponent},
  //laboratory
{path:'laboratory',component:LaboratoryComponent},
{path: 'medicalfolder/listlaboratory/updatelaboratory/:id',component:UpdateLaboratoryComponent},

  { path: 'medicalfolder/listlaboratory/:patientId', component: ListLaboratoryComponent },
  {path:'listlaboratory',component:ListLaboratoryComponent},
  { path: 'medicalfolder/listlaboratory/:patientId/add', component: LaboratoryComponent},
   //traitement
{path:'medicaltreatment',component:AddMedicalTreatmentComponent},
{path: 'medicalfolder/listmedicaltreatment/updatemedicaltreatment/:id',component:UpdateMedicalTreatmentComponent},

  { path: 'medicalfolder/listmedicaltreatment/:patientId', component: ListMedicalTreatmentComponent },
  {path:'listmedicaltreatment',component:ListLaboratoryComponent},
  { path: 'medicalfolder/listmedicaltreatment/:patientId/add', component: AddMedicalTreatmentComponent},








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
