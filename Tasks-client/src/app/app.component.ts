import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ChatComponent } from './chat/chat.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,MainComponent,ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent {

}
