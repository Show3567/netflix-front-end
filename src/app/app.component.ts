import { Component, inject, PLATFORM_ID } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { LocationService } from './services/location.service';
import { isPlatformBrowser } from '@angular/common';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocationsService } from './services/amc/locations.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  providers: [LocationService, LocationsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private isBrowser = false;
  private readonly platform = inject(PLATFORM_ID);

  constructor(
    private locationService: LocationService,
    private locationInfo: LocationsService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platform);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      from(this.locationService.getCurrentPosition())
        .pipe(
          switchMap((position: GeolocationPosition) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            return this.locationInfo.getCurrentLocalInfo(latitude, longitude);
          }),
        )
        .subscribe(console.log);
    }
  }
}
