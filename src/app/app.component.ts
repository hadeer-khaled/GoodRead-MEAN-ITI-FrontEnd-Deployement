import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeleteConfirmComponent } from './components/adminPageComponents/delete-confirm/delete-confirm.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project';
}
