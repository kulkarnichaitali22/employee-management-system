import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee {
  model: Employee = { name: '', email: '', department: '', salary: 0 };

  constructor(private svc: EmployeeService, private router: Router) {}

  submit(f: NgForm) {
    if (f.invalid) return;
    this.svc.create(this.model).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: err => console.error('Create error', err)
    });
  }
}
