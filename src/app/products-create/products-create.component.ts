import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent {
  name: string = '';
  supplierName: string = ''; // Cambiado a supplierName
  categoryName: string = ''; // Cambiado a categoryName
  price: number = 0;
  description: string = '';
  unitsInStock: number = 0;
  discontinued: boolean = false;
  imageFile?: File; // Cambiado a File | undefined

  constructor(private productsService: ProductsService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  saveProduct() {
    if (this.name && this.supplierName && this.categoryName && this.price !== null && this.description && this.unitsInStock !== null) {
      this.productsService.saveProduct({
        name: this.name,
        supplierName: this.supplierName, // Cambiado a supplierName
        categoryName: this.categoryName, // Cambiado a categoryName
        price: this.price,
        description: this.description,
        unitsInStock: this.unitsInStock,
        discontinued: this.discontinued
      }, this.imageFile).subscribe(
        res => {
          alert("Product created successfully");
          this.router.navigate(['/products']); 
        },
        err => {
          alert("Error creating product");
        }
      );
    } else {
      alert("Please fill all the fields.");
    }
  }
}
