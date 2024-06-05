import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LenguageService {

  private selectedLanguageSubject = new BehaviorSubject<string>(localStorage.getItem('selectedLanguage') || 'es');
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();

  setSelectedLanguage(language: string) {
    this.selectedLanguageSubject.next(language);
    localStorage.setItem('selectedLanguage', language); // Guardar en localStorage
  }

  getSelectedLanguage(): string {
    return localStorage.getItem('selectedLanguage') || 'es';
  }
}
