import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-my-player',
    imports: [SharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './my-player.component.html',
    styleUrl: './my-player.component.scss'
})
export class MyPlayerComponent {
  // videoPath = '/assets/home/jojo_6.mp4';
  videoPath = '/assets/home/netflix_trailer.mp4';
  // videoPath =
  //   'https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/high.mp4';
}
