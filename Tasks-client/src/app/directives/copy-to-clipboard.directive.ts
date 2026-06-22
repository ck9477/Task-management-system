import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({  selector: '[appCopyToClipboard]'})
export class CopyToClipboardDirective {
  snackBar= inject( MatSnackBar);

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('dblclick')  dblclick() {
    const input = document.createElement('input');
    input.value = 'chanik9477@gmail.com';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    this.showMessage();
  }

  
    showMessage() {
    this.snackBar.open('צור קשר במייל', 'כתובת המייל הועתקה ללוח.', {
      duration: 3000, 
      horizontalPosition: 'center',
      verticalPosition: 'top', 
    });
  }
}
