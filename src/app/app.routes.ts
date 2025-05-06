import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ChatbotComponent } from './views/chatbot/chatbot.component';
import { ResultatComponent } from './views/resultat/resultat.component';
import { ScannerComponent } from './views/scanner/scanner.component';

export const routes: Routes = [
  {
    path: '',
    component : HomeComponent
  },
  {
      path: 'chatbot',
      component: ChatbotComponent,
  },
  {
      path: 'resultat',
      component: ResultatComponent,
  },
  {
    path: 'scanner',
    component: ScannerComponent
  },
  {
      path: '**',
      redirectTo: ''
  }
];
