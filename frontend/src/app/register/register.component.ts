import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerObj: any = {
    "username": "",
    "email": "",
    "password": ""
  };
  constructor(private authService: AuthService, private router: Router) {}

  register() {
    console.log(this.registerObj)
    this.authService.register(this.registerObj).subscribe( res => {
      console.log(res)
    })
  }
}
