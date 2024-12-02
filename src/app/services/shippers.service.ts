import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {
  private baseUrl = "http://localhost:3000/shippers";

  constructor(private http: HttpClient) {}

  saveShipper(companyName: string, phone: string, file: File) {
    const formData = new FormData();
    formData.append("companyname", companyName);
    formData.append("phone", phone);
    formData.append("image", file);

    return this.http.post<any>(this.baseUrl, formData);
  }

  updateShipper(id: string, shipperData: { companyName: string, phone: string }, file?: File) {
    const formData = new FormData();
    formData.append("companyname", shipperData.companyName);
    formData.append("phone", shipperData.phone);
    if (file) {
      formData.append("image", file);
    }
  
    return this.http.patch<any>(`${this.baseUrl}/${id}`, formData);
  }

  deleteShipper(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  fetchShippers() {
    return this.http.get<any>(this.baseUrl);
  }
}
