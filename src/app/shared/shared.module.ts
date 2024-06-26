import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatRadioModule,

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
