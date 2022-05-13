import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieItemComponent } from './movie-item.component';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { MovieItemGuard } from '../../guards/movie-item.guard';

const routes: Routes = [
  { path: '', component: MovieItemComponent, canActivate: [MovieItemGuard] },
];

@NgModule({
  declarations: [MovieItemComponent, VideoItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes),
  ],
})
export class MovieItemModule {}
