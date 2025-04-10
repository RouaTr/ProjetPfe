import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/service/Auth.service'; // adjust the path if needed

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  practitionnerEmail:string ="";
constructor(private auth:AuthGuard){


}
ngOnInit(): void{}
}
