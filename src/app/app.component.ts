import { Component, OnInit } from '@angular/core';
import { WithLocalstorageService } from './services/auth/with-localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private withLocalstorageService: WithLocalstorageService) {}

  ngOnInit(): void {
    // console.log(
    //   'hello, this is userValue: ',
    //   this.withLocalstorageService.userValue
    // );
  }
}
