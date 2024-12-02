import { Component } from '@angular/core';
import { ShippersService } from '../services/shippers.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shippers-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shippers-create.component.html',
  styleUrl: './shippers-create.component.css'
})
export class ShippersCreateComponent {
  companyName: string = '';
  phone: string = '';
  imageFile: File | null = null;

  constructor(private shippersService: ShippersService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  saveShipper() {
    if (this.companyName && this.phone && this.imageFile) {
      this.shippersService.saveShipper(this.companyName, this.phone, this.imageFile).subscribe(
        res => {
          alert("Shipper created successfully");
          this.router.navigate(['/shippers']); 
        },
        err => {
          alert("Error creating shipper");
        }
      );
    } else {
      alert("Please fill all the fields and upload an image.");
    }
  }
}
