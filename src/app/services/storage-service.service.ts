import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  // Function to set item in localStorage
  setItem(key: string, value: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error('localStorage is not available');
    }
  }

  // Function to get item from localStorage
  getItem(key: string): any {
    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      console.error('localStorage is not available');
      return null;
    }
  }

  // Function to remove item from localStorage
  removeItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      console.error('localStorage is not available');
    }
  }

}