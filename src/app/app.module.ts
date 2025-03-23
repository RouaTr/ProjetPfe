import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    UpdatePatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
