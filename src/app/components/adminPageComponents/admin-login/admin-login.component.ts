import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../../interfaces/users';
import { AdminService } from '../../../services/admin.service';
import { StorageService } from '../../../services/storage-service.service';
// import { HandleTokenService } from '../../handle-token.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  logObj!: Users;
  errorMessage = null;
  token: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private http: AdminService,
    private storageService: StorageService
  ) // private jwtService: HandleTokenService
  {
    this.logObj = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
    };
  }

  checkLoggedIn() {
    const token = this.storageService.getItem('token');
    console.log(token);
    this.isLoggedIn = !!token;
  }

  onSubmit(form: any) {
    const credentials = {
      username: this.logObj.username,
      password: this.logObj.password,
    };
    this.http.login(credentials).subscribe(
      (response) => {
        this.storageService.setItem('token', response.data);
        console.log('token', this.storageService.getItem('token'));
        this.checkLoggedIn();
        console.log(this.isLoggedIn);
        const jwtToken = response.data;
        const tokenParts = jwtToken.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        console.log('payload', payload);
        this.storageService.setItem('AdminLogged', payload.userExist.firstName);
        console.log('AdminLogged', this.storageService.getItem('AdminLogged'));
        const role = payload.userExist.role;
        console.log('role', role);
        this.storageService.setItem('role', payload.userExist.role);
        this.router.navigate(['/adminControlPage']);
      },
      (error) => {
        console.error('Error logging in:', error.errorMessage);
      }
    );
  }
}
