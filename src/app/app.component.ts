import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('netflix_trailer', { static: true }) netflixTrailer?: ElementRef;
  @ViewChild('HBO_trailer', { static: true }) hboTrailer?: ElementRef;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.netflixTrailer?.nativeElement.play();
    this.hboTrailer?.nativeElement.play();
  }

  ngOnDestroy(): void {}
}
