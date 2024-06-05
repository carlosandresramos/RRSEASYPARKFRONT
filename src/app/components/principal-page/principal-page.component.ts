import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { LenguageService } from 'src/app/service/lenguage/lenguage.service';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.css']
})
export class PrincipalPageComponent {
images:string="assets/images/Logo.jpg";
selectedLanguage!: string; 

constructor(private translocoservice: TranslocoService, private languageService: LenguageService) {
  this.languageService.selectedLanguage$.subscribe(language => {
    this.selectedLanguage = language;
  });
  
}
ngOnInit(): void {
  const selectedLanguage = this.languageService.getSelectedLanguage();
  localStorage.setItem('selectedLanguage', selectedLanguage);
  this.translocoservice.setActiveLang(selectedLanguage)
}
}