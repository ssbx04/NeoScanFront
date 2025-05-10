import { Component } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {
  constructor(
    private readonly predictionService : PredictionService,
    private readonly router: Router
  ){}
  image_selection_state : boolean = false
  base64String : string = ''
  fileType : string = ''
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.fileType = file.type;
    const reader = new FileReader();
    reader.onload = () => {
      this.base64String = (reader.result as string).split(',')[1];
    };
    reader.readAsDataURL(file);
    this.image_selection_state = true
  }
  predictCancer(){
    this.predictionService.predictCancer({
      "image": this.base64String
    }).subscribe(response =>{
      this.saveDataToStorage(this.base64String,this.fileType,response.predicted_class)
      this.router.navigate(['/resultat']);
  })
  }
  saveDataToStorage(base64String: string, fileType: string,reponse : string) {
    sessionStorage.setItem('base64String', base64String);
    sessionStorage.setItem('fileType', fileType);
    sessionStorage.setItem('reponse', reponse);
  }
}
