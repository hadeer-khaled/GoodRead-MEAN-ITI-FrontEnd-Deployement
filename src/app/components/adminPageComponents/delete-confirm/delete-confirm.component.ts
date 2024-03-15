import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.css'
})
export class DeleteConfirmComponent {
  @Output() confirmDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  onDeleteConfirmed() {
    this.confirmDelete.emit();
  }


}

