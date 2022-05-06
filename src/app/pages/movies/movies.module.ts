import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesComponent } from './movies.component';
import { CoreModule } from '../../core/core.module';

const routes: Routes = [{ path: '', component: MoviesComponent }];

@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
})
export class MoviesModule {}
