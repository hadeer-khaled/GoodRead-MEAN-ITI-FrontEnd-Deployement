import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CategoryCardComponent } from '../catergory-card/catergory-card.component.js';
import { CategoryService } from '../../../../services/category.service.js';
import { UserNavBarComponent } from '../../user-nav-bar/user-nav-bar.component.js';
import { StorageService } from '../../../../services/storage-service.service.js';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryCardComponent, NgIf, UserNavBarComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  token: string = '';
  categories: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.token = this.storageService.getItem('token') || '';
    this.categoryService
      .getAllcategoriesNames('categoriesName', this.token)
      .subscribe(
        (data: any) => {
          console.log('categories:', data.categories);
          this.categories = data.categories;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }
}
