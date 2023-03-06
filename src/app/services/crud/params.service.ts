import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class paramsService {
  constructor(private http: HttpClient) {}

  getparams(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/params/get-all`, data);
  }

  findByparams(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/params/findBy`, data);
  }

  insertUpdateparams(data: any) {
    console.log(data, 'data');
    return this.http.post<any>(`${environment.apiUrl}/params/save`, data);
  }

  deleteparams(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/params/delete`, data);
  }
}
