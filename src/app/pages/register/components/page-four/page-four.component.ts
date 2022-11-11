import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';

import * as AuthActions from 'src/app/Ngrx/Auth/auth.actions';
import * as AuthSelectors from 'src/app/Ngrx/Auth/auth.selectors';
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

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly store: Store
  ) {}
  ngOnInit(): void {}

  selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
    this.selecedColumn = user;
  }
  handleNavigate() {
    const { jwtToken } = this.authService.userValue;

    if (jwtToken) {
      this.authService
        .upgradePermission({
          role: UserRole[this.selecedColumn],
        })
        .subscribe();
    } else {
      this.authService
        .sighup({ role: UserRole[this.selecedColumn] })
        .subscribe();

      //* ~~~~ Ngrx ~~~~
      // this.store.dispatch(
      //   AuthActions.SendSignUpRequest({ role: UserRole[this.selecedColumn] })
      // );
    }
  }
}
