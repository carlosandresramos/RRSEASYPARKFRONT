import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { LenguageService } from 'src/app/service/lenguage/lenguage.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent {

  selectedLanguage!: string;

  constructor(private translocoservice: TranslocoService, private languageService: LenguageService) {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
    });
  }
  onLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedLanguage = target.value;
    this.myMethod(selectedLanguage);
    this.languageService.setSelectedLanguage(selectedLanguage);
  }

  myMethod(selectedLanguage: string) {
    // Aquí puedes hacer lo que quieras con el valor seleccionado
    this.translocoservice.setActiveLang(selectedLanguage)
    console.log('Idioma seleccionado:', selectedLanguage);
    // También puedes llamar a otros métodos o realizar otras acciones aquí
  }
}
