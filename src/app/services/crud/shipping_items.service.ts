import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Shipping_itemsService {
  constructor(private http: HttpClient) {}

  getShipping_items(data: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/shipping_item/get-all`,
      data
    );
  }

  findByShipping_items(data: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/shipping_item/findBy`,
      data
    );
  }

  insertUpdateShipping_items(data: any) {
    console.log(data, 'data');
    return this.http.post<any>(
      `${environment.apiUrl}/shipping_item/save`,
      data
    );
  }

  deleteShipping_items(data: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/shipping_item/delete`,
      data
    );
  }
}
