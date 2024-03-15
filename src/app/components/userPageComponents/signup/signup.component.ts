import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PasswordRegx } from '../../../passwordRegex';
import { Router } from '@angular/router';
import { match } from 'node:assert';
import { UserService } from '../../../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  SignUpForm!: FormGroup;
  selectedImage!: File;

  constructor(
    private router: Router,
    private userServics: UserService,
    private httpClient: HttpClient
  ) {
    this.SignUpForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*'),
          this.noSpacesValidator,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*'),
          this.noSpacesValidator,
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(PasswordRegx),
        ]),
        rePassword: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  handleFormSubmit() {
    console.log(this.SignUpForm.value);

    const formData = new FormData();
    formData.append('firstName', this.SignUpForm.value.firstName);
    formData.append('lastName', this.SignUpForm.value.lastName);
    formData.append('email', this.SignUpForm.value.email);
    formData.append('password', this.SignUpForm.value.password);
    formData.append('image', this.selectedImage);
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // formData.append('image', this.selectedImage, this.selectedImage.name);

    this.userServics.register(formData).subscribe(
      (response) => {
        console.log('Message:', response.Message);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.router.navigate(['user']);
  }
  noSpacesValidator(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }

    return null;
  }
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword');

    if (password !== rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
      rePassword?.markAsTouched();
    } else {
      rePassword?.setErrors(null);
    }

    return null;
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

  // onUpload() {
  //   const formData = new FormData();
  //   formData.append('image', this.selectedImage, this.selectedImage.name);
  // }
}
