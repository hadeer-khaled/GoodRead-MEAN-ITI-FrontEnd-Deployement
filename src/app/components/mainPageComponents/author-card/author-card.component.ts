import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css',
})
export class AuthorCardComponent {
  @Input() authorName: string = '';
  @Input() authorImage: string = '';
}
