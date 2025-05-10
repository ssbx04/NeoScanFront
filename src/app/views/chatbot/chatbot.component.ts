import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,NgxSkeletonLoaderModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  formulaire : FormGroup
  constructor(private readonly formBuilder : FormBuilder,private readonly chatService : ChatService){
    this.formulaire = this.formBuilder.group({
      message : ['',[Validators.required,Validators.minLength(3)]],
    })
  }
  display_loader: boolean = false;
  temp_response: string = '';
  received_response: string = '';
  messages: { sender: string, content: string }[] = [];
  isTyping: boolean = false;
  envoyerMessage(contenu: string) {
    this.messages.push({ sender: 'user', content: contenu });
  }
  fillInput(message : string){
    this.formulaire.patchValue({
    message: message
  });
  }
  onSubmit(){
    const userMessage = this.formulaire.get('message')?.value;
    this.envoyerMessage(userMessage);
    this.formulaire.reset();

    this.display_loader = true;
    this.received_response = '';
    this.temp_response = '';
    this.isTyping = true;

    this.chatService.getResponse(userMessage).subscribe(response => {
      this.temp_response = response.response;
      this.display_loader = false;
      this.messages.push({ sender: 'api', content: ''});
      let index = 0
      const typeF = () => {
        if (index < this.temp_response.length) {
          this.messages[this.messages.length - 1].content += this.temp_response.charAt(index);
          index++;
          const delay = Math.floor(Math.random() * 30) + 1;
          setTimeout(typeF, delay);
        }
        else{
          this.isTyping = false;
        }
      };
      typeF();
    });
  }
}
