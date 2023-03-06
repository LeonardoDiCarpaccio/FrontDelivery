import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private alert: AlertService
  ) {}
  user: any;
  role: any;
  register(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    // this.getIdTeamHttp();
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data).pipe(
      map((user) => {
        console.log(user, 'userr');
        this.role = user.role[0].name;
        localStorage.setItem('user', JSON.stringify(user));
        switch (this.role) {
          case 'admin':
            this.router.navigate(['/order-waiting']);
            break;
          case 'client':
            this.router.navigate(['/dashboard']);
            break;
          default:
            this.router.navigate(['/dashboard']);
        }
      })
    );
  }
  async getMe() {
    await this.http.post<any>(`${environment.apiUrl}/auth/check`, {}).subscribe(
      (res) => {
        console.log(res, 'resulta de la check??');
        switch (res.role) {
          case 'admin':
            console.log('case admin');
            break;
          case 'client':
            console.log('case client');
            break;
          default:
            this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        this.alert.info('Reconnexion...');
      }
    );
  }

  getRole() {
    if (typeof this.role != 'undefined') {
      return this.role;
    } else {
      let a: any = localStorage.getItem('user');
      if (a == null) {
        this.disconnect();
      } else {
        let us = JSON.parse(a).role;
        this.role = us;
        return this.role;
      }
    }
  }

  disconnect() {
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
    this.alert.info('Reconnexion...');
  }
}
