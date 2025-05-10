import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private readonly httpClient : HttpClient) { }
  predictCancer(body : any) : Observable<any>{
    return this.httpClient.post('http://127.0.0.1:8000/api/predict/',body)
  }
}
