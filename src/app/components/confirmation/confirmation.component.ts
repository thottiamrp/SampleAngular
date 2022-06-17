import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  @Input() open: boolean = false;

  @Input() title: string;

  @Input() body: string;

  @Output() confirm = new EventEmitter();

  @Output() cancel = new EventEmitter();

  closeDialog(event: Event): void {

    console.log({ event })

    this.open = false;

    this.cancel.emit(event);
  }

  accept(event: Event): void {

    this.open = false;

    this.confirm.emit(event);
  }
}
