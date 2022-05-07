import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [{ path: '', component: PageNotFoundComponent }];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes),
  ],
})
export class PageNotFoundModule {}
