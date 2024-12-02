// categories.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = "http://localhost:3000/categories";

  constructor(private http: HttpClient) {}

  saveCategory(categoryName: string, description: string, file: File) {
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("description", description);
    formData.append("image", file);

    return this.http.post<any>(this.baseUrl, formData);
  }

  updateCategory(id: string, categoryData: { categoryName: string, description: string }, file?: File) {
    const formData = new FormData();
    formData.append("categoryName", categoryData.categoryName);
    formData.append("description", categoryData.description);
    if (file) {
      formData.append("image", file);
    }
  
    return this.http.patch<any>(`${this.baseUrl}/${id}`, formData);
  }

  deleteCategory(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  fetchCategories() {
    return this.http.get<any>(this.baseUrl);
  }
}
