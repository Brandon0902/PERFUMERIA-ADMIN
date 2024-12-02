import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesService } from '../services/categories.service';
import { Router, RouterModule } from '@angular/router';

declare var bootstrap: any; // Declarar bootstrap para usar sus métodos de modal

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  category = {
    _id: "",  // Añadir ID para actualización
    categoryName: "",
    description: "",
    imageFile: undefined as File | undefined
  };

  constructor(private categoriesService: CategoriesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  createCategory() {
    this.router.navigate(['/create-categories']);
  }

  updateCategory() {
    if (this.category._id) {
      this.categoriesService.updateCategory(this.category._id, {
        categoryName: this.category.categoryName,
        description: this.category.description
      }, this.category.imageFile).subscribe(
        res => {
          alert("Category updated");
          this.fetchCategories();
          this.closeModal('editCategoryModal'); // Cierra el modal después de la actualización
        },
        err => {
          alert("Error updating category");
        }
      );
    } else {
      alert("No category ID provided.");
    }
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe(
      res => {
        alert("Categoria Eliminada Exitosamente");
        this.fetchCategories();  
      },
      err => {
        console.error("Error al eliminar la categoria:", err);
        alert("Error al eliminar la categoria");
      }
    );
  }  

  fetchCategories() {
    this.categoriesService.fetchCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => console.error(error)
    );
  }

  openEditModal(category: any) {
    this.category = { ...category, imageFile: undefined }; 
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.category.imageFile = file;
    } else {
      this.category.imageFile = undefined;
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
