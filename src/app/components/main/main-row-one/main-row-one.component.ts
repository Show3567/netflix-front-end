import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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
    console.log(this.form.value);
  }
}
