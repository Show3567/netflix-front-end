import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { slideInAnimation } from 'src/app/animation/router.anim';
import { SseService } from './services/sse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  constructor(private readonly sseService: SseService) {}

  ngOnInit(): void {
    // this.sseService.getServerSendEvent().subscribe((res: any) => {
    //   console.log(JSON.parse(res.data));
    // });
  }

  onActivate(e: any) {}
}
