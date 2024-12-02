import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = "http://localhost:3000/products";

  constructor(private http: HttpClient) {}

  // Método para guardar un nuevo producto
  saveProduct(productData: {
    name: string;
    supplierName: string;
    categoryName: string;
    price: number;
    description: string;
    unitsInStock: number;
    discontinued: boolean;
  }, file?: File) {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("supplierName", productData.supplierName); // Cambiado a supplierName
    formData.append("categoryName", productData.categoryName); // Cambiado a categoryName
    formData.append("price", productData.price.toString());
    formData.append("description", productData.description);
    formData.append("unitsInStock", productData.unitsInStock.toString());
    formData.append("discontinued", productData.discontinued.toString());
    if (file) {
      formData.append("image", file);
    }

    return this.http.post<any>(this.baseUrl, formData);
  }

  // Método para actualizar un producto existente
  updateProduct(id: string, productData: {
    name: string;
    supplierName: string;
    categoryName: string;
    price: number;
    description: string;
    unitsInStock: number;
    discontinued: boolean;
  }, file?: File) {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("supplierName", productData.supplierName); // Cambiado a supplierName
    formData.append("categoryName", productData.categoryName); // Cambiado a categoryName
    formData.append("price", productData.price.toString());
    formData.append("description", productData.description);
    formData.append("unitsInStock", productData.unitsInStock.toString());
    formData.append("discontinued", productData.discontinued.toString());
    if (file) {
      formData.append("image", file);
    }

    return this.http.patch<any>(`${this.baseUrl}/${id}`, formData);
  }

  // Método para eliminar un producto
  deleteProduct(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Método para obtener todos los productos
  fetchProducts() {
    return this.http.get<any>(this.baseUrl);
  }
}
