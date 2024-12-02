import { Component } from '@angular/core';
import { SuppliersService } from '../services/suppliers.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliers-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers-create.component.html',
  styleUrls: ['./suppliers-create.component.css']
})
export class SuppliersCreateComponent {
  companyName: string = '';
  address: string = '';
  city: string = '';
  region: string = '';
  postalCode: string = '';
  country: string = '';
  phone: string = '';

  constructor(private suppliersService: SuppliersService, private router: Router) {}

  saveSupplier() {
    const supplierData = {
      companyName: this.companyName,
      address: this.address,
      city: this.city,
      region: this.region,
      postalCode: this.postalCode,
      country: this.country,
      phone: this.phone
    };

    this.suppliersService.saveSupplier(supplierData).subscribe(
      res => {
        alert("Supplier created successfully");
        this.router.navigate(['/suppliers']);
      },
      err => {
        console.error("Error creating supplier:", err);
        alert("Error creating supplier");
      }
    );
  }
}
