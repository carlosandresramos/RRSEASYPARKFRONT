import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{'confirm.RE' | transloco }}</h2>
    <mat-dialog-content>{{'confirm.mensaje' | transloco }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">{{'confirm.cancelar' | transloco }}</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>{{'confirm.aceptar' | transloco }}</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
