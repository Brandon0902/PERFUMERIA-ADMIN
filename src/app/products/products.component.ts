import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  product = {
    _id: "",
    name: "",
    supplierName: "", // Ahora un campo de texto
    categoryName: "", // Ahora un campo de texto
    price: 0,
    description: "",
    unitsInStock: 0,
    discontinued: false,
    imageFile: undefined as File | undefined
  };

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  createProduct() {
    this.router.navigate(['/create-products']);
  }

  updateProduct() {
    if (this.product._id) {
      this.productsService.updateProduct(this.product._id, {
        name: this.product.name,
        supplierName: this.product.supplierName, // Campo de texto
        categoryName: this.product.categoryName, // Campo de texto
        price: this.product.price,
        description: this.product.description,
        unitsInStock: this.product.unitsInStock,
        discontinued: this.product.discontinued
      }, this.product.imageFile).subscribe(
        res => {
          alert("Product updated");
          this.fetchProducts();
          this.closeModal('editProductModal');
        },
        err => {
          alert("Error updating product");
        }
      );
    } else {
      alert("No product ID provided.");
    }
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe(
      res => {
        alert("Product deleted successfully");
        this.fetchProducts();
      },
      err => {
        console.error("Error deleting product:", err);
        alert("Error deleting product");
      }
    );
  }

  fetchProducts() {
    this.productsService.fetchProducts().subscribe(
      data => {
        this.products = data;
      },
      error => console.error(error)
    );
  }

  openEditModal(product: any) {
    this.product = { ...product, imageFile: undefined };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.imageFile = file;
    } else {
      this.product.imageFile = undefined;
    }
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
    }
  }
}
