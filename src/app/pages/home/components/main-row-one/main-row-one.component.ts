import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main-row-one',
  templateUrl: './main-row-one.component.html',
  styleUrls: ['./main-row-one.component.scss'],
})
export class MainRowOneComponent implements OnInit {
  form!: FormGroup;
  get email() {
    return this.form.get('email');
  }

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.maxLength(45), Validators.email],
      ],
    });
  }
  ngOnDestroy(): void {}

  onSubmit() {
    const { jwtToken } = this.authService.userValue;
    if (jwtToken) {
      this.router.navigate(['/movies']);
    } else {
      this.router.navigate(['/register/step1']);
      this.authService.addUserInfo(this.form.value);
    }
  }
}
