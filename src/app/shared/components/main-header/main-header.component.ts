import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { SearchMovieDto } from '../../../services/interfaces/searchMovieDto.interface';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input() showSearchForm: boolean = false;

  isLogin!: boolean;
  username = '';
  searchKeyWord = '';

  constructor(
    private readonly authService: AuthService,
    private readonly tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    const { jwtToken, username } = this.authService.userValue;
    if (jwtToken && username) {
      this.isLogin = true;
      this.username = username;
    } else {
      this.isLogin = false;
    }
  }

  searchMovieByKeyWord() {
    const { tmdb_key: key } = this.authService.userValue;
    if (key) {
      const searchDto: SearchMovieDto = {
        api_key: key,
        query: this.searchKeyWord,
      };
      this.searchKeyWord = '';
      this.tmdbService.searchMovie(searchDto).subscribe(console.log);
    }
  }

  signOut() {
    this.authService.logout();
    this.isLogin = false;
    this.username = '';
  }
}
