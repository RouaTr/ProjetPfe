import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Practitionner } from '../Entity/Practitionner.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-header-pharmacy',
  templateUrl: './header-pharmacy.component.html',
  styleUrls: ['./header-pharmacy.component.css']
})
export class HeaderPharmacyComponent {
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
}
}
