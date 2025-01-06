import { NgStyle } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/services/interfaces/movie.interface';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-recommend',
  imports: [SharedModule, NgStyle],
  templateUrl: './recommend.component.html',
  styleUrl: './recommend.component.scss',
})
export class RecommendComponent {
  recommendImg = input<string>();
  searchForm = input.required<boolean>();
  recommend = input.required<Movie[]>();
  hoverRecommend = output<number>();

  private router = inject(Router);

  handleHoverRecommend(id: number) {
    this.hoverRecommend.emit(id);
  }

  navigateMovie(id: number) {
    this.router.navigate(['/movies', id]);
  }

  switchToMoiveList() {}

  switchToTvList() {}
}
