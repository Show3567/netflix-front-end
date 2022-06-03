import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ProdTitle } from 'src/app/app.module';
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
    private authService: WithLocalstorageService,
    private readonly titleService: Title,
    @Inject(ProdTitle) private readonly prodTitle: string // this.titleService.setTitle(`${this.prodTitle}-SignIn`);
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-SignIn`);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      loginFacebook: [false],
    });
    this.authService.user$.subscribe((userinfo) =>
      console.log('userinfo: ', userinfo)
    );
  }

  onSubmit() {
    const credencialSignIn = {
      email: this.email?.value,
      password: this.password?.value,
    };
    this.authService.login(credencialSignIn).subscribe(
      () => {},
      (err) => console.log(err)
    );
  }
}
