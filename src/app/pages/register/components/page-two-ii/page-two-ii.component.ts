import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page-two-ii',
  templateUrl: './page-two-ii.component.html',
  styleUrls: ['./page-two-ii.component.scss'],
})
export class PageTwoIiComponent implements OnInit {
  form!: FormGroup;

  get username() {
    return this.form.get('username');
  }
  get apiKey() {
    return this.form.get('apiKey');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      apiKey: [''],
    });
  }

  errorMessageUsername() {
    return this.username?.hasError('required') ? 'You need a username' : '';
  }
  errorMessageApiKey() {
    return this.apiKey?.hasError('required') ? 'We need your tmdb api_key' : '';
  }

  onSubmit() {}
}
