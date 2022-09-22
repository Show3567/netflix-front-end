import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

// import { ROUTER_SCROLL_SERVICE } from './core/core.module';
import { RouterScrollService } from './services/router-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('mainContent')
  private mainContentElement!: ElementRef<HTMLElement>;

  constructor(
    private readonly routerScrollService: RouterScrollService,
    private readonly logger: NGXLogger
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    if (this.mainContentElement) {
      this.routerScrollService.setCustomViewportToScroll(
        this.mainContentElement.nativeElement
      );
    } else {
      this.logger.error(
        'The main content element could not be found. Was it renamed? It is required here to ensure that scrolling works as expected!'
      );
    }
  }

  onActivate(e: any) {}
}
