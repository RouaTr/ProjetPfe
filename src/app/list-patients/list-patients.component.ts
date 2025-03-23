import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Patient } from '../Entity/Patient.Entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent {

  role:String
  listPatients: Patient[];

  constructor(private service:CrudService,private router:Router ) { }




  ngOnInit(): void {
    this.role=localStorage.getItem("role")as string;
    this.service.getPatients().subscribe(patient => {
      this.listPatients= patient
    })
  }
}
0

