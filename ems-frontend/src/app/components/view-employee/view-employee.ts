import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-employee.html',
  styleUrl: './view-employee.css'
})
export class ViewEmployee implements OnInit {
  private route = inject(ActivatedRoute);
  private svc = inject(EmployeeService);

  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    department: '',
    salary: 0
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.svc.getById(id).subscribe({
        next: (data) => (this.employee = data),
        error: (err) => console.error('❌ Error loading employee:', err)
      });
    }
  }
}
