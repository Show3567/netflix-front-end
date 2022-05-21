import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProdTitle } from 'src/app/app.module';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    private readonly titleService: Title,
    @Inject(ProdTitle) private readonly prodTitle: string
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-NotFound`);
  }
}
