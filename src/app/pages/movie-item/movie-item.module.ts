import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieItemComponent } from './movie-item.component';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { MovieItemGuard } from '../../core/guards/movie-item.guard';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';
import { DialogComponent } from './components/dialog/dialog.component';

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
  declarations: [MovieItemComponent, VideoItemComponent, DialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes),
  ],
})
export class MovieItemModule {}
