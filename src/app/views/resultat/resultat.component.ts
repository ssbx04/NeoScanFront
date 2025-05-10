import { Component } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultat',
  standalone: true,
  imports: [],
  templateUrl: './resultat.component.html',
  styleUrl: './resultat.component.css'
})
export class ResultatComponent {
  constructor(
      private readonly predictionService : PredictionService,
      private readonly router: ActivatedRoute
    ){}
  base64String : string = ''
  fileType : string = ''
  reponse : string = ''
  ngOnInit(){
      this.base64String = sessionStorage.getItem('base64String') ?? '';
      this.fileType = sessionStorage.getItem('fileType') ?? '';
      this.reponse = sessionStorage.getItem('reponse') ?? '';
  }
}
