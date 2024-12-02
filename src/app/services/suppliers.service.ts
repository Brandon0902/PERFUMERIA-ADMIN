import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private baseUrl = "http://localhost:3000/suppliers";

  constructor(private http: HttpClient) {}

  // Crear un nuevo supplier
  saveSupplier(supplierData: { companyName: string; address: string; city: string; region: string; postalCode: string; country: string; phone: string }) {
    return this.http.post<any>(this.baseUrl, supplierData);
  }

  // Actualizar un supplier existente
  updateSupplier(id: string, supplierData: { companyName: string; address: string; city: string; region: string; postalCode: string; country: string; phone: string }) {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, supplierData);
  }

  // Eliminar un supplier
  deleteSupplier(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Obtener todos los suppliers
  fetchSuppliers() {
    return this.http.get<any>(this.baseUrl);
  }
}
