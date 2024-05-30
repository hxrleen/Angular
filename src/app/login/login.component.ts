import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.username == 'abc' && this.password == 'p') {
      console.log('Login successful with data:', {
        username: this.username,
        password: this.password,
      });

      this.router.navigate(['/home']);
    } else {
      console.log('Form is invalid');
    }
  }
}
