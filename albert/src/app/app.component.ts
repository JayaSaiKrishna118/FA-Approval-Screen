import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreditplanapprovalComponent } from './creditplanapproval/creditplanapproval.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreditplanapprovalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Credit Plan Approval';
}
