import {
  Component,
  inject,
  makeStateKey,
  OnInit,
  TransferState,
} from '@angular/core';
import { SharedModule } from './shared/shared.module';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';

const RENDERED_KEY = makeStateKey<boolean>('home-rendered');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class AppComponent implements OnInit {
  showContent = false;
  transferState = inject(TransferState);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started to:', event.url);
      } else if (event instanceof NavigationEnd) {
        console.log('Navigation ended at:', event.url);
      }
    });
  }

  ngOnInit(): void {}
}
