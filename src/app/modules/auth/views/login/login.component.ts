import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
