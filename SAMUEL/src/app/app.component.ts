import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AprroveCreditPlanBtnComponent } from './common/aprrove-credit-plan-btn/aprrove-credit-plan-btn.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AprroveCreditPlanBtnComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'faculty-advisor-credit-plan-approval';
}
