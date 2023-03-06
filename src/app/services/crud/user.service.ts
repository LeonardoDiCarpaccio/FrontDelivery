import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/user/get-all`, data);
  }

  findByUser(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/user/findBy`, data);
  }

  insertUpdateUser(data: any) {
    console.log(data, 'data');
    return this.http.post<any>(`${environment.apiUrl}/user/save`, data);
  }

  deleteUser(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/user/delete`, data);
  }
}
