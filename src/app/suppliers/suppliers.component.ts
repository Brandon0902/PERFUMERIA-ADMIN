import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SuppliersService } from '../services/suppliers.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any; // Declarar bootstrap si es necesario para utilizar los métodos de modal

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  suppliers: any[] = [];
  supplier = {
    _id: "",
    companyName: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    phone: ""
  };

  constructor(private suppliersService: SuppliersService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSuppliers();
  }

  createSupplier() {
    this.router.navigate(['/create-suppliers']);
  }

  updateSupplier() {
    if (this.supplier._id) {
      this.suppliersService.updateSupplier(this.supplier._id, {
        companyName: this.supplier.companyName,
        address: this.supplier.address,
        city: this.supplier.city,
        region: this.supplier.region,
        postalCode: this.supplier.postalCode,
        country: this.supplier.country,
        phone: this.supplier.phone
      }).subscribe(
        res => {
          alert("Supplier updated");
          this.fetchSuppliers();
          this.closeModal('editSupplierModal'); // Cierra el modal después de la actualización
        },
        err => {
          alert("Error updating supplier");
        }
      );
    } else {
      alert("No supplier ID provided.");
    }
  }

  deleteSupplier(id: string) {
    this.suppliersService.deleteSupplier(id).subscribe(
      res => {
        alert("Supplier eliminado exitosamente");
        this.fetchSuppliers();
      },
      err => {
        console.error("Error al eliminar el supplier:", err);
        alert("Error al eliminar el supplier");
      }
    );
  }

  fetchSuppliers() {
    this.suppliersService.fetchSuppliers().subscribe(
      data => {
        this.suppliers = data;
      },
      error => console.error(error)
    );
  }

  openEditModal(supplier: any) {
    this.supplier = { ...supplier };
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
    }
  }
}
