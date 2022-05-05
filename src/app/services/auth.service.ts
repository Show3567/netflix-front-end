import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUserAuth, UserRole } from './interfaces/user-auth.interface';
import { AppUser } from './interfaces/user-login.interface';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseAuth = 'http://localhost:4231/auth';

  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();

  constructor(private readonly http: HttpClient) {}
}
