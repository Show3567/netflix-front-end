import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  header: string = 'X-AMC-Vendor-Key';
  baseUrl = 'https://api.amctheatres.com/v2/locations';

  constructor(private http: HttpClient) {}

  getCurrentLocalInfo(latitude: number, longitude: number) {
    const url = `${this.baseUrl}?latitude=${latitude}&longitude=${longitude}`;
    const headers = new HttpHeaders({
      [this.header]: env.amc_api,
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers });
  }
}
