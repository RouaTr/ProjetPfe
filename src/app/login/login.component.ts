import { Component } from '@angular/core';
import { Practitionner } from '../Entity/Practitionner.Entity';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  messageCommande=""
  loginForm: FormGroup
    constructor(
      private fb: FormBuilder,
      private service:CrudService,
      private router:Router

    ) {
      let formControls = {
      practitionnerEmail: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required]),
      }

      this.loginForm = this.fb.group(formControls)
    }

    get practitionnerEmail() { return this.loginForm.get('practitionnerEmail') }
    get password() { return this.loginForm.get('password') }
    ngOnInit(): void {
    }

    login() {
      let data = this.loginForm.value;
      console.log(data);
      let practitionner = new Practitionner(null,null,null,null,data.practitionnerEmail,data.password,null);
      console.log(practitionner);
      if (

        data.practitionnerEmail == 0 ||
        data.password == 0
      )
      {
        this.messageCommande = `<div class="alert alert-warning" role="alert">
          service en panne!!!!
        </div>`

      } else {

        this.service.loginPractitionner(practitionner).subscribe(
          res=>{
            console.log(res);
            let token = res.token;
            localStorage.setItem("myToken",res.token);
            localStorage.setItem("role",res.role);
            this.router.navigate(['']).then(()=>window.location.reload());
        },

          err=>{
            console.log(err);
            this.messageCommande = `<div class="alert alert-warning" role="alert">
            service en panne!!!!
          </div>`

          }
        )

      }
      }}

