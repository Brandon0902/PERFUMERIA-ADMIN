import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = {
    email: "",
    password: ""
  };

  constructor(private loginService: LoginService, private router: Router) {}

  iniSesion() {
    this.loginService.login(this.usuario).subscribe(
      res => {
        this.loginService.guardarSesion(res.usuarioAutenticado);
      },
      err => {
        if (typeof err.error === "string" && err.error.length === 0) {
          alert(err);
        } else {
          alert(err.error);
        }
        console.log(err);
      }
    );
  }
}
