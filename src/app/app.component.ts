import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ShippersComponent } from './shippers/shippers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CategoriesCreateComponent } from './categories-create/categories-create.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ShippersCreateComponent } from './shippers-create/shippers-create.component';
import { SuppliersCreateComponent } from './suppliers-create/suppliers-create.component';
import { OrdersComponent } from './orders/orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    LoginComponent, 
    NavbarComponent, 
    CategoriesComponent, 
    ProductsComponent, 
    ShippersComponent, 
    SuppliersComponent,
    CategoriesCreateComponent,
    ShippersCreateComponent,
    ProductsCreateComponent,
    SuppliersCreateComponent,
    OrdersComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent  { 
  title = 'perfumeriaAdmin';

}

