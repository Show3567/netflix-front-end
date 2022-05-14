import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';

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
    private readonly registerService: RegisterService
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
    this.router.navigate(['/register/step1']);
    this.registerService.addUserInfo(this.form.value);
  }
}
