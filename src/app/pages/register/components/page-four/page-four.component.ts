import { Component, OnInit } from '@angular/core';

import { UserRole } from 'src/app/services/interfaces/user-auth.interface';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';
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
  selecedColumn: 'USER' | 'SUPERUSER' | 'ADMIN' = 'ADMIN';

  constructor(private readonly authService: AuthNgrxService) {}
  ngOnInit(): void {}

  selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
    this.selecedColumn = user;
  }
  handleNavigate() {
    const { jwtToken } = this.authService.userValue;

    if (jwtToken) {
      this.authService.upgradePermission({
        role: UserRole[this.selecedColumn],
      });
    } else {
      this.authService.sighup({ role: UserRole[this.selecedColumn] });
    }
  }
}
