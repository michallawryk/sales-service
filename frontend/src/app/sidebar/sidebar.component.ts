import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [FormsModule, CommonModule, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) {}
  question: string = '';

  onSearch() {
    //if (this.question.trim()) {
    console.log(this.question)
      this.router.navigate(['/search'], { queryParams: { query: this.question } });
    //}
  }
}
