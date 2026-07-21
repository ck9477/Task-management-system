import { Component, inject} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MessageService } from '../services/http/message.service';
import { ChatMessagePipe } from '../pipes/chat-message.pipe';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ChatMessagePipe,
  ]
})
export class ChatComponent {
  num = 0;
  open = false;
  input = '';
  messages = [{ text: 'שלום! איך אפשר לעזור לך?', sender: '' }];
  private messagService = inject(MessageService);

  ngOnInit(): void {
    this.num = Math.random();
  }

  send() {
    if (!this.input.trim()) return;
    const details = localStorage.getItem('user');
    let userName = '';
    if (details) {
      userName = JSON.parse(details).userName;
    }

    const userMessage = this.input;
    this.input = '';

    this.messagService.sendMessage$(userName, userMessage).subscribe({
      next: () => console.log('ההודעה נשלחה בהצלחה'),
      error: (err) => console.error('שגיאה בשליחת הודעה:', err)
    });
  }

  addMessage(userName: string, message: string) {
    this.messages.push({ text: message, sender: userName });
    this.updateStyle();
  }

  updateStyle() {
    const elements = document.getElementsByClassName("chat-message");
    for (const el of elements as any) {
      el.innerHTML = (el.textContent || '').replace(/&&\s*(.*?)\s*&&/, '<span class="bold">$1</span>');
    }
  }

  openChat() {
    this.num = Math.random();
    this.open = true;
  }

  closeChat() {
    this.open = false;
  }
}
