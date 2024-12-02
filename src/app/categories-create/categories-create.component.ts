import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css']
})
export class CategoriesCreateComponent {
  category = {
    categoryName: "",
    description: "",
    imageFile: null as File | null
  };

  constructor(private categoriesService: CategoriesService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.category.imageFile = file;
    }
  }

  saveCategory() {
    if (this.category.imageFile) {
      this.categoriesService.saveCategory(this.category.categoryName, this.category.description, this.category.imageFile).subscribe(
        res => {
          alert("Categoria creada exitosamente");
          this.router.navigate(['/categories']); 
        },
        err => {
          alert("Error al crear la categoria");
        }
      );
    } else {
      alert("Por favor Carga una imagen");
    }
  }
}
