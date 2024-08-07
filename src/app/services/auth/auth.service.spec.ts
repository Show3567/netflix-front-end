import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

import { TmdbService } from '../tmdb/tmdb.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppUser } from '../interfaces/user-login.interface';
import { AuthDto } from '../interfaces/authDto.interface';
import { UserRole } from '../interfaces/user-auth.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        TmdbService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', () => {
    const appUser: AppUser = { email: 'testuser', password: 'testpassword' };
    const authDto: AuthDto = { accessToken: 'testtoken', role: UserRole.USER };

    service.login(appUser).subscribe((response) => {
      expect(response).toEqual(authDto);
    });

    const req = httpMock.expectOne(`${service.authServerPath}/auth/signin`);
    expect(req.request.method).toBe('POST');
    req.flush(authDto);
  });

  it('should handle login error', () => {
    const appUser: AppUser = { email: 'testuser', password: 'testpassword' };

    service.login(appUser).subscribe(
      () => {},
      (error) => {
        expect(error).toBe('SomeThing Wrong during sign in!');
      },
    );

    const req = httpMock.expectOne(`${service.authServerPath}/auth/signin`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Some error occurred'));
  });

  // Add more test cases for other methods in AuthService
});
