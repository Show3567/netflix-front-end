import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WithLocalstorageService } from 'src/app/services/auth/with-localstorage.service';

@Component({
  selector: 'app-page-four',
  templateUrl: './page-four.component.html',
  styleUrls: ['./page-four.component.scss'],
})
export class PageFourComponent implements OnInit {
  plans = {
    Basic: {
      MonthlyPrice: 9.99,
      VideoQuality: 'Good',
      Resolution: '480p',
    },
    Standard: {
      MonthlyPrice: 15.49,
      VideoQuality: 'Better',
      Resolution: '1080p',
    },
    Premium: {
      MonthlyPrice: 19.99,
      VideoQuality: 'Best',
      Resolution: '4K + HDR',
    },
  };
  selecedColumn = 2;

  constructor(
    private router: Router,
    private withLocalstorageService: WithLocalstorageService
  ) {}

  ngOnInit(): void {}

  selectPlan(num: number) {
    this.selecedColumn = num;
  }

  handleNavigate() {
    !this.withLocalstorageService.userValue.jwtToken
      ? this.router.navigate(['/login'])
      : this.router.navigate(['/movies']);
  }
}
