import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import { UserRole } from 'src/app/services/interfaces/user-auth.interface';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule, NgClass, CurrencyPipe],
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

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}
  ngOnInit(): void {}

  selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
    this.selecedColumn = user;
  }
  handleNavigate() {
    const { jwtToken } = this.authService.userSignal();

    if (jwtToken) {
      this.authService
        .upgradePermission({
          role: UserRole[this.selecedColumn],
        })
        .subscribe();
      this.router.navigate(['/movies']);
    } else {
      this.authService
        .signup({ role: UserRole[this.selecedColumn] })
        .subscribe();
      this.router.navigate(['/login']);
    }
  }
}
