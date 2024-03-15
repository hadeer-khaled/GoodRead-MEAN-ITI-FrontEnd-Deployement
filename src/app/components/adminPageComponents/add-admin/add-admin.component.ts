import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService } from '../../../services/admin.service.js';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component.js';
import { StorageService } from '../../../services/storage-service.service.js';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule, AdminNavbarComponent],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css',
})
export class AddAdminComponent {
  token: string = '';
  addAdminForm: FormGroup;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private storageService: StorageService
  ) {
    this.addAdminForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*'),
          this.noSpacesValidator,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*'),
          this.noSpacesValidator,
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  noSpacesValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value && /\s/.test(control.value)) {
      return { noSpaces: true };
    }
    return null;
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  handleFormSubmit() {
    console.log(this.addAdminForm.value);

    const formData = new FormData();
    formData.append('firstName', this.addAdminForm.value.firstName);
    formData.append('lastName', this.addAdminForm.value.lastName);
    formData.append('email', this.addAdminForm.value.email);
    formData.append('password', this.addAdminForm.value.password);
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    this.token = this.storageService.getItem('token') || '';
    this.adminService.addAdmin(this.addAdminForm.value, this.token).subscribe(
      (response) => {
        console.log('Message:', response.Message);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.router.navigate(['admin']);
  }
}
