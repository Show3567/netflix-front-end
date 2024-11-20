import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ProdTitle } from 'src/app/core/core.module';

@Component({
    imports: [RouterLink],
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    private readonly titleService: Title,
    @Inject(ProdTitle) private readonly prodTitle: string,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-NotFound`);
  }
}
