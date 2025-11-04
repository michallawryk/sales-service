import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    imports: [FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginObj: any = {
    "username": "",
    "password": ""
  };
 
  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    console.log(this.loginObj)
    this.authService.login(this.loginObj).subscribe( res => {
      if (res.token){
        alert('Logowanie udane!');
        localStorage.setItem('token', res.token);
        console.log(localStorage.getItem('token'));
        this.router.navigateByUrl('/home');
      } 
    })
  }
}
