import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  constructor(private http: HttpClient) {}

  getCommand(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/command/get-all`, data);
  }

  findByCommand(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/command/findBy`, data);
  }

  insertUpdateCommand(data: any) {
    console.log(data, 'data');
    return this.http.post<any>(`${environment.apiUrl}/command/save`, data);
  }

  deleteCommand(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/command/delete`, data);
  }
}
