import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ProdTitle } from 'src/app/app.module';
import { WithLocalstorageService } from 'src/app/services/auth/with-localstorage.service';

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
  loginForm!: UntypedFormGroup;
  login_msg = { msg: '' };

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: UntypedFormBuilder,
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
      (_) => {
        this.login_msg.msg = '';
      },
      (err) => {
        this.login_msg.msg = 'Please check your login credentials';
      }
    );
  }
}
