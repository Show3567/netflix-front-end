import { Component, Input, OnInit, input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-main-row-three',
  templateUrl: './main-row-three.component.html',
  styleUrls: ['./main-row-three.component.scss'],
})
export class MainRowThreeComponent {
  header = input('');
  content = input('');
  channel = input('');
}
