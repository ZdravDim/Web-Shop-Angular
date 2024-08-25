import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-order-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule, MatDialogContent, MatDialogActions, MatDialogClose, CommonModule],
  templateUrl: './edit-order-dialog.component.html',
  styleUrl: './edit-order-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditOrderDialogComponent {

  protected address: string = '';
  protected someFieldsAreEmpty: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditOrderDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }

  changeAddress() {
    this.someFieldsAreEmpty = false;
    if (!this.address) {
      this.someFieldsAreEmpty = true;
      return;
    }
    
    this.dialogRef.close(this.address);
  }
}
