import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-employee.html',
  styleUrl: './update-employee.css',
})
export class UpdateEmployee implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private svc = inject(EmployeeService);

  // Build form (no ngModel anywhere)
  form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(0)]],
  });

  private id!: number;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) return;

    // If your service methods are named differently, adjust here.
    this.svc.getById(this.id).subscribe({
      next: (e: Employee) => this.form.patchValue(e),
      error: (err) => console.error('Load error', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue() as Employee;

    // If your service uses updateEmployee(), change to that name.
    this.svc.update(this.id, payload).subscribe({
      next: () => {
        // replace with your toast if you have one
        alert('✅ Employee updated successfully!');
        this.router.navigate(['/employees']);
      },
      error: (err) => console.error('Update error', err),
    });
  }

  // helpers for template
  get f() { return this.form.controls; }
}
