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

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'newpatient',component:AddPatientComponent},
  {path:'listpatient',component:ListPatientsComponent},
  {path:'clinicsymptoms',component:CliniaclSymptomsComponent},
  {path:'medhistory',component:MedicalHistoryComponent},
  {path:'fonctsymptoms',component:FonctionnalSymptomsComponent},
  {path:'observation',component:ObservationComponent},
  {path:'laboratory',component:LaboratoryComponent},
  {path:'listobservation',component:ListObservationComponent},
  {path:'medicalfolder/:id',component:MedicalFolderComponent},
  {path:'updatePatient/:id',component:UpdatePatientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
