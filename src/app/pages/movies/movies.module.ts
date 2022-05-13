import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesComponent } from './movies.component';
import { CoreModule } from '../../core/core.module';
import { ItemComponent } from './components/item/item.component';
import { MoviesGuard } from '../../guards/movies.guard';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    canActivate: [MoviesGuard],
  },
];

@NgModule({
  declarations: [MoviesComponent, ItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes),
  ],
})
export class MoviesModule {}
