import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {
  employees = signal<Employee[]>([]);
 q: string = '';
  sortKey = signal<keyof Employee | ''>('');
  sortAsc = signal(true);

  constructor(private svc: EmployeeService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.svc.getAll().subscribe({
      next: data => this.employees.set(data),
      error: err => console.error('Fetch error', err)
    });
  }
  
get filtered() {
  const term = this.q.toLowerCase().trim();
  let arr = this.employees().filter(e =>
    [e.name, e.email, e.department].some(v => (v || '').toLowerCase().includes(term))
  );
  const key = this.sortKey();
  if (key) {
    const dir = this.sortAsc() ? 1 : -1;
    arr = [...arr].sort((a: any, b: any) =>
      (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) * dir
    );
  }
  return arr;
}

  setSort(key: keyof Employee) {
    if (this.sortKey() === key) this.sortAsc.set(!this.sortAsc());
    else { this.sortKey.set(key); this.sortAsc.set(true); }
  }

  remove(id?: number) {
    if (!id) return;
    if (confirm('Delete this employee?')) {
      this.svc.delete(id).subscribe({
        next: () => this.employees.set(this.employees().filter(e => e.id !== id)),
        error: err => console.error('Delete error', err)
      });
    }
  }
}
