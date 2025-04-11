import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Practitionner } from '../Entity/Practitionner.Entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userDetails:any
   practitionner: Practitionner[] = [];
  constructor(private router: Router, private service: CrudService) {
     this.userDetails = this.service.getUserInfo();
}
ngOnInit() {
  this.userDetails = this.service.getUserInfo();
  console.log('userDetails:', this.userDetails);  // Vérifie les données de l'utilisateur
}

logout(){
  console.log("logout")

  localStorage.removeItem('myToken');

    this.router.navigate(['/']).then(()=>{
      window.location.reload()
    })
}}
