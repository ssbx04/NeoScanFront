import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private readonly httpClient: HttpClient) { }
  getResponse(message : string) : Observable<any>{
    const body = {
      "message": message + ' Réponds uniquement avec du texte brut, sans formatage ni liste.',
      "history": [
          {
              "role": "user",
              "content": "Quels sont les types de cancer ?"
          },
          {
              "role": "assistant",
              "content": "Il existe plusieurs types, comme le cancer du sein, des poumons, etc."
          }
      ]
    }
    return this.httpClient.post('http://127.0.0.1:8000/api/chatbot/',body)
  }
}
