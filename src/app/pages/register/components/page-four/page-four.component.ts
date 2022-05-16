import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WithLocalstorageService } from 'src/app/services/auth/with-localstorage.service';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';

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
    private router: Router,
    private authService: WithLocalstorageService,
    private readonly registerService: WithLocalstorageService
  ) {}

  ngOnInit(): void {}

  selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
    this.selecedColumn = user;
  }

  handleNavigate() {
    // !this.authService.userValue.jwtToken
    //   ? this.router.navigate(['/login'])
    //   : this.router.navigate(['/movies']);
    const { jwtToken } = this.registerService.userValue;

    if (jwtToken) {
      this.registerService
        .upgradePermission({
          role: UserRole[this.selecedColumn],
        })
        .subscribe(console.log);
    } else {
      this.registerService
        .sighup({ role: UserRole[this.selecedColumn] })
        .subscribe();
    }
  }
}
