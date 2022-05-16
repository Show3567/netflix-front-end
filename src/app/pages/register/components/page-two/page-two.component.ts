import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WithLocalstorageService } from '../../../../services/auth/with-localstorage.service';
import { CustomValidator } from '../../../../services/validators/custom.validator';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
})
export class PageTwoComponent implements OnInit {
  form!: FormGroup;

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly customValidator: CustomValidator,
    private readonly authService: WithLocalstorageService
  ) {}
  ngOnInit(): void {
    const initemailVal = this.authService.appNewUser.email
      ? this.authService.appNewUser.email
      : '';

    this.form = this.fb.group({
      email: [
        initemailVal,
        [Validators.email],
        [this.customValidator.hasEmail()],
      ],
      password: [''],
    });
  }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }
  onSubmit() {
    this.authService.addUserInfo(this.form.value);
    this.router.navigate(['/register/step2ii']);
  }
}
