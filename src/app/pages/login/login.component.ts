import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WithLocalstorageService } from 'src/app/services/auth/with-localstorage.service';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';
import { AuthService } from '../../services/auth/auth.service';

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
    // private authService: AuthService,
    private withLocalstorageService: WithLocalstorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      loginFacebook: [false],
    });
    this.withLocalstorageService.user$.subscribe((userinfo) =>
      console.log('userinfo: ', userinfo)
    );
  }

  onSubmit() {
    const credencialSignIn = {
      email: this.email?.value,
      password: this.password?.value,
    };
    console.log(credencialSignIn);
    this.withLocalstorageService.login(credencialSignIn).subscribe(console.log);
  }
}
