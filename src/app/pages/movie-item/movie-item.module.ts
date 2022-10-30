import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieItemComponent } from './movie-item.component';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { MovieItemGuard } from 'src/app/core/guards/movie-item.guard';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';
import { MovieDialogComponent } from './components/movie-dialog/movie-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: MovieItemComponent,
    canActivate: [MovieItemGuard],
    data: {
      claimType: [UserRole.ADMIN, UserRole.SUPERUSER],
    },
  },
];

@NgModule({
  declarations: [MovieItemComponent, VideoItemComponent, MovieDialogComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class MovieItemModule {}
