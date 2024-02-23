import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CheckIdleService } from './services/check-idle/check-idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('mainContent')
  private mainContentElement!: ElementRef<HTMLElement>;

  constructor(private idleCheckerService: CheckIdleService) {}

  // Use HostListener to listen for user activities
  @HostListener('document:click', ['$event'])
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keypress', ['$event'])
  handleUserActivity(event: Event) {
    this.idleCheckerService.notifyUserActivity();
  }

  onActivate(e: any) {}
}
