import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { CliniaclSymptomsComponent } from './cliniacl-symptoms/cliniacl-symptoms.component';
import { FonctionnalSymptomsComponent } from './fonctionnal-symptoms/fonctionnal-symptoms.component';
import { ObservationComponent } from './observation/observation.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ListObservationComponent } from './list-observation/list-observation.component';
import { MedicalFolderComponent } from './medical-folder/medical-folder.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { UpdateObservationComponent } from './update-observation/update-observation.component';
import { ListFunctionalSymptomsComponent } from './list-functional-symptoms/list-functional-symptoms.component';
import { UpdateFunctionalSymptomsComponent } from './update-functional-symptoms/update-functional-symptoms.component';
import { ListMedicalHistoryComponent } from './list-medical-history/list-medical-history.component';
import { UpdateMedicalHistoryComponent } from './update-medical-history/update-medical-history.component';
import { UpdateClinicalSymptomsComponent } from './update-clinical-symptoms/update-clinical-symptoms.component';
import { ListClinicalSymptomsComponent } from './list-clinical-symptoms/list-clinical-symptoms.component';
import { ListLaboratoryComponent } from './list-laboratory/list-laboratory.component';
import { UpdateLaboratoryComponent } from './update-laboratory/update-laboratory.component';
import { AddMedicalTreatmentComponent } from './add-medical-treatment/add-medical-treatment.component';
import { UpdateMedicalTreatmentComponent } from './update-medical-treatment/update-medical-treatment.component';
import { ListMedicalTreatmentComponent } from './list-medical-treatment/list-medical-treatment.component';
import { UpdateTreatmentByPharmacyComponent } from './update-treatment-by-pharmacy/update-treatment-by-pharmacy.component';
import { ListOfMedicalPrescriptionsComponent } from './list-of-medical-prescriptions/list-of-medical-prescriptions.component';
import { AddPractitionnerComponent } from './add-practitionner/add-practitionner.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HeaderPharmacyComponent } from './header-pharmacy/header-pharmacy.component';
import { MenuPharmacyComponent } from './menu-pharmacy/menu-pharmacy.component';
import { UpdatePractitionnerComponent } from './update-practitionner/update-practitionner.component';
import { ManagePractitionnerAccessComponent } from './manage-practitionner-access/manage-practitionner-access.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ListOfAllPatientsComponent } from './list-of-all-patients/list-of-all-patients.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    AddPatientComponent,
    TabsComponent,
    ListPatientsComponent,
    CliniaclSymptomsComponent,
    FonctionnalSymptomsComponent,
    ObservationComponent,
    MedicalHistoryComponent,
    LaboratoryComponent,
    ListObservationComponent,
    MedicalFolderComponent,
    UpdatePatientComponent,
    UpdateObservationComponent,
    ListFunctionalSymptomsComponent,
    UpdateFunctionalSymptomsComponent,
    ListMedicalHistoryComponent,
    UpdateMedicalHistoryComponent,
    UpdateClinicalSymptomsComponent,
    ListClinicalSymptomsComponent,
    ListLaboratoryComponent,
    UpdateLaboratoryComponent,
    AddMedicalTreatmentComponent,
    UpdateMedicalTreatmentComponent,
    ListMedicalTreatmentComponent,
    UpdateTreatmentByPharmacyComponent,
    ListOfMedicalPrescriptionsComponent,
    AddPractitionnerComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HeaderPharmacyComponent,
    MenuPharmacyComponent,
    UpdatePractitionnerComponent,
    ManagePractitionnerAccessComponent,
    HeaderAdminComponent,
    MenuAdminComponent,
    ListOfAllPatientsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
