import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesComponent } from './movies.component';
import { ItemComponent } from './components/item/item.component';
import { MoviesGuard } from 'src/app/core/guards/movies.guard';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';

export const PositionKey = new InjectionToken<string>('');

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    canActivate: [MoviesGuard],
    data: { claimType: [UserRole.ADMIN, UserRole.SUPERUSER, UserRole.USER] },
    title: 'NotFlix-Movies',
  },
];

@NgModule({
  declarations: [MoviesComponent, ItemComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [{ provide: PositionKey, useValue: 'movies' }],
})
export class MoviesModule {}
