import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { OverviewControlPipe } from './pipes/overview-control.pipe';
import { TitlePipe } from './pipes/title.pipe';

@NgModule({
  declarations: [
    MainFooterComponent,
    MainHeaderComponent,
    OverviewControlPipe,
    TitlePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,

    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    YouTubePlayerModule,
    InfiniteScrollModule,
    OverviewControlPipe,
    TitlePipe,

    MainFooterComponent,
    MainHeaderComponent,
  ],
})
export class SharedModule {}
