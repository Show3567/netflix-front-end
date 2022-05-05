import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  backgroundColor = 'rgba(0, 0, 0, 0.8)';
  linkList = [
    'FAQ',
    'Help Center',
    'Terms of Use',
    'Privacy',
    'Cookie Preferences',
    'Corporate Information',
  ];
  loginForm!: FormGroup;
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      loginFacebook: [false],
    });
  }

  onSubmit() {
    const credencialSignIn = {
      email: this.email?.value,
      password: this.password?.value,
    };
    this.authService.signIn(credencialSignIn).subscribe();
  }
}
