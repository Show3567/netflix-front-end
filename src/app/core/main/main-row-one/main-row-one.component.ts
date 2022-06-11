import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WithLocalstorageService } from '../../../services/auth/with-localstorage.service';

@Component({
  selector: 'app-main-row-one',
  templateUrl: './main-row-one.component.html',
  styleUrls: ['./main-row-one.component.scss'],
})
export class MainRowOneComponent implements OnInit {
  form!: UntypedFormGroup;
  get email() {
    return this.form.get('email');
  }

  constructor(
    private fb: UntypedFormBuilder,
    private readonly router: Router,
    private readonly authService: WithLocalstorageService
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
    const { jwtToken, tmdb_key } = this.authService.userValue;
    if (jwtToken) {
      this.router.navigate(['/movies']);
    } else {
      this.router.navigate(['/register/step1']);
      this.authService.addUserInfo(this.form.value);
    }
  }
}
