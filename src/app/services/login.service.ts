import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://localhost:3000/users/login";

  constructor(private router: Router, private http: HttpClient) {}

  login(user: object) {
    return this.http.post<any>(this.url, user);
  }

  guardarSesion(user: any) {
    alert(user.message);
    // Guarda el token en el localStorage
    localStorage.setItem("usuario", user.email);
    localStorage.setItem("token", user.jwtoken); // Guarda el token
    this.router.navigate(["/"]);
  }

  esLogueado(): boolean {
    return localStorage.getItem("usuario") !== null;
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
