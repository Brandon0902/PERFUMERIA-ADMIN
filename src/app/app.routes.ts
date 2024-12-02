import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ShippersComponent } from './shippers/shippers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CategoriesCreateComponent } from './categories-create/categories-create.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ShippersCreateComponent } from './shippers-create/shippers-create.component';
import { SuppliersCreateComponent } from './suppliers-create/suppliers-create.component';
import { OrdersComponent } from './orders/orders.component';
import { eslogueadoGuard } from './guardias/eslogueado.guard';


export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "categories", component: CategoriesComponent, canActivate:[eslogueadoGuard]},
    {path: "shippers", component: ShippersComponent, canActivate:[eslogueadoGuard]},
    {path: "products", component: ProductsComponent, canActivate:[eslogueadoGuard]},
    {path: "suppliers", component: SuppliersComponent,canActivate:[eslogueadoGuard]},
    {path: "create-categories", component: CategoriesCreateComponent, canActivate:[eslogueadoGuard]},
    {path: "create-products", component: ProductsCreateComponent, canActivate:[eslogueadoGuard]},
    {path: "create-shippers", component: ShippersCreateComponent, canActivate:[eslogueadoGuard]},
    {path: "create-suppliers", component: SuppliersCreateComponent, canActivate:[eslogueadoGuard]},
    {path: "orders", component: OrdersComponent, canActivate:[eslogueadoGuard]}
];
