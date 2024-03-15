import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from '../../../interfaces/author';
import { AuthorService } from '../../../services/author.service';
import { StorageService } from '../../../services/storage-service.service';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-authors-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './authors-table.component.html',
  styleUrl: './authors-table.component.css',
  // providers: [DatePipe],
})
export class AuthorsTableComponent {
  authors!: Array<Author>;
  newAuthors: any;
  authorForm!: FormGroup;
  editAuthorForm!: FormGroup;
  id!: number;
  _id!: string;
  authorEdit!: any;
  editFirstName!: string;
  editLastName!: string;
  token: string = '';
  discription: string = '';
  selectedImage!: File;
  constructor(
    private router: Router,
    private authorService: AuthorService,
    private storageService: StorageService
  ) {
    this.token = this.storageService.getItem('token') || '';
    this.authorForm = new FormGroup({
      newFirstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      newLastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      newDob: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });

    this.editAuthorForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      description: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
    });
    this.token = this.storageService.getItem('token') || '';
  }
  ngOnInit(): void {
    this.getAllAuthors();
  }

  // ================= Get All Authors =================== \\
  getAllAuthors() {
    this.authorService.getAuthors().subscribe(
      (response: any) => {
        console.log('Subscribe response', response);
        this.authors = response;
        console.log('this.authors', this.authors);
      },
      (error: any) => {
        console.error('Error getting books:', error);
      }
    );
  }
  // ================= Add New Author =================== \\
  getNewAuthorName() {
    this.newAuthors = {
      firstName: this.authorForm.value.newFirstName,
      lastName: this.authorForm.value.newLastName,
      dob: this.authorForm.value.newDob,
      description:
        'This is A new Author with dummy description , This is A new Author with dummy description',
    };

    const formData = new FormData();
    formData.append('firstName', this.authorForm.value.newFirstName);
    formData.append('lastName', this.authorForm.value.newLastName);
    formData.append('dob', this.authorForm.value.newDob);
    formData.append(
      'description',
      'This is A new Author with dummy description , This is A new Author with dummy description'
    );
    formData.append('image', this.selectedImage);
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    this.authorService.createAuthor(formData, this.token).subscribe(
      (response) => {
        console.log('Author added successfully:', response);
        this.getAllAuthors();
        window.location.reload();
      },
      (error) => {
        console.error('Error adding Author:', error);
      }
    );
  }
  onImageSelected(event: any): void {
    // Ensure that event.target is not null before proceeding
    if (event.target) {
      const files: FileList | null = event.target.files;
      if (files && files.length > 0) {
        this.selectedImage = files[0];
        console.log('Selected File:', this.selectedImage);
      }
    }
  }
  // --------------------------- NgBootstrap Code --------------------------- \\
  private modalService = inject(NgbModal);
  closeResult = '';
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  // ================= edit modale =================== \\

  editAuthor(author: any, content: any) {
    console.log('Editing book:', author);
    this.id = author.id;
    this._id = author._id;
    this.discription = author.description;
    console.log(this.discription);
    this.editAuthorForm.patchValue({
      firstName: author.firstName,
      lastName: author.lastName,
      dob: new Date(author.dob),
    });

    this.modalService.open(content, { centered: true });
  }

  // ================= Author update =================== \\

  updateAuthor() {
    this.authorEdit = {
      _id: this._id,
      id: this.id,
      firstName: this.editAuthorForm.value.firstName,
      lastName: this.editAuthorForm.value.lastName,
      dob: this.editAuthorForm.value.dob,
      discription: this.discription,
    };
    console.log(this.authorEdit);
    console.log(this.id);
    console.log(this.authorEdit._id);
    if (this.authorEdit && this.id) {
      this.authorService
        .updateAuthor(this.authorEdit._id, this.authorEdit, this.token)
        .subscribe(
          (response) => {
            console.log('Author updated successfully:', response);
            this.getAllAuthors();
            window.location.reload();
          },
          (error) => {
            console.error('Error updating Author:', error);
            alert(`${error.error.error}`);
          }
        );
    }
    this.modalService.dismissAll();
  }
  // ================= delete modal  =================== \\

  deleteAuthorModal(author: any, content: any) {
    this.id = author.id;
    this._id = author._id;
    this.modalService.open(content, { centered: true });
  }

  // ================= Author delete =================== \\
  deleteaAuthor() {
    console.log(this.id);
    if (this.id) {
      this.authorService.deleteAuthor(this._id, this.token).subscribe(
        (response) => {
          console.log('Author deleted successfully:', response);
          this.getAllAuthors();
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting Author:', error);
          alert(`${error.error.error}`);
        }
      );
    }
    this.modalService.dismissAll();
  }
}
