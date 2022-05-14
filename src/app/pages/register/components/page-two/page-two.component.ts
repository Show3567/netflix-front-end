import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/services/auth/register.service';

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

  constructor(
    private fb: FormBuilder,
    private readonly registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
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
    this.registerService.addUserInfo(this.form.value);
  }
}
