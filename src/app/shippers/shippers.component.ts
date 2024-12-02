import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ShippersService } from '../services/shippers.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any; // Declarar bootstrap si es necesario para utilizar los métodos de modal

@Component({
  selector: 'app-shippers',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent implements OnInit {
  shippers: any[] = [];
  shipper = {
    _id: "",
    companyname: "",
    phone: "",
    imageFile: undefined as File | undefined
  };

  constructor(private shippersService: ShippersService, private router: Router) {}

  ngOnInit(): void {
    this.fetchShippers();
  }

  createShipper() {
    this.router.navigate(['/create-shippers']);
  }

  updateShipper() {
    if (this.shipper._id) {
      this.shippersService.updateShipper(this.shipper._id, {
        companyName: this.shipper.companyname,
        phone: this.shipper.phone
      }, this.shipper.imageFile).subscribe(
        res => {
          alert("Shipper updated");
          this.fetchShippers();
          this.closeModal('editShipperModal'); // Cierra el modal después de la actualización
        },
        err => {
          alert("Error updating shipper");
        }
      );
    } else {
      alert("No shipper ID provided.");
    }
  }

  deleteShipper(id: string) {
    this.shippersService.deleteShipper(id).subscribe(
      res => {
        alert("Shipper eliminado exitosamente");
        this.fetchShippers();
      },
      err => {
        console.error("Error al eliminar el shipper:", err);
        alert("Error al eliminar el shipper");
      }
    );
  }

  fetchShippers() {
    this.shippersService.fetchShippers().subscribe(
      data => {
        this.shippers = data;
      },
      error => console.error(error)
    );
  }

  openEditModal(shipper: any) {
    this.shipper = { ...shipper, imageFile: undefined };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.shipper.imageFile = file;
    } else {
      this.shipper.imageFile = undefined;
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
