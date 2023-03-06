import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getClient(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/client/get-all`, data);
  }

  findByClient(data: any) {
    console.log(data, 'data');

    return this.http.post<any>(`${environment.apiUrl}/client/findBy`, data);
  }

  insertUpdateClient(data: any) {
    console.log(data, 'data');
    return this.http.post<any>(`${environment.apiUrl}/client/save`, data);
  }

  deleteClient(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/client/delete`, data);
  }
}
