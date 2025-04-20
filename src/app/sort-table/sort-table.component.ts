import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sort-table',
  templateUrl: './sort-table.component.html',
  styleUrls: ['./sort-table.component.scss']
})
export class SortTableComponent {
  @ViewChild('tableBody', { static: true }) tableBody!: ElementRef;

  sortColumn: keyof User = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private renderer: Renderer2) {}

  sort(column: keyof User): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const rows: User[] = [
      { name: 'Alice', age: 25, email: 'alice@example.com' },
      { name: 'Bob', age: 30, email: 'bob@example.com' },
      { name: 'Charlie', age: 35, email: 'charlie@example.com' }
    ];

    rows.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    // Clear existing rows in the table body
    this.tableBody.nativeElement.innerHTML = '';

    // Append sorted rows to the table body
    rows.forEach(row => {
      const tableRow = this.renderer.createElement('div');
      this.renderer.addClass(tableRow, 'table-row');

      const nameCell = this.renderer.createElement('div');
      this.renderer.addClass(nameCell, 'table-cell');
      this.renderer.setProperty(nameCell, 'textContent', row.name);
      this.renderer.appendChild(tableRow, nameCell);

      const ageCell = this.renderer.createElement('div');
      this.renderer.addClass(ageCell, 'table-cell');
      this.renderer.setProperty(ageCell, 'textContent', row.age.toString());
      this.renderer.appendChild(tableRow, ageCell);

      const emailCell = this.renderer.createElement('div');
      this.renderer.addClass(emailCell, 'table-cell');
      this.renderer.setProperty(emailCell, 'textContent', row.email);
      this.renderer.appendChild(tableRow, emailCell);

      this.renderer.appendChild(this.tableBody.nativeElement, tableRow);
    });
  }
}

interface User {
  name: string;
  age: number;
  email: string;
}