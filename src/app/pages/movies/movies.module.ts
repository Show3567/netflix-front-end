import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesComponent } from './movies.component';
import { ItemComponent } from './components/item/item.component';
import { MoviesGuard } from 'src/app/core/guards/movies.guard';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    canActivate: [MoviesGuard],
    data: { claimType: [UserRole.ADMIN, UserRole.SUPERUSER, UserRole.USER] },
  },
];

@NgModule({
  declarations: [MoviesComponent, ItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ScrollingModule,
  ],
})
export class MoviesModule {}
