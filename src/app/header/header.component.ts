import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userDetails:any
  constructor(private router: Router, private service: CrudService) {
     this.userDetails = this.service.getUserInfo();
}
logout(){
  console.log("logout")

  localStorage.clear()

    this.router.navigate(['/login']).then(()=>{
      window.location.reload()
    })
}}
