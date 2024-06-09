import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaComponent } from './fa/fa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  fa_approval_clicked : boolean = false;
  constructor(){
  }

  approve($event: any){
    console.log('button click')
    this.fa_approval_clicked = true;
  }
}
