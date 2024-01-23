import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo, statusObj } from '../../models/todo-interface';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
})
export class TodoCardComponent implements OnInit {
  @Input() todoItem: Todo | null = null;
  @Output() statusChangeEvent: EventEmitter<statusObj> =
    new EventEmitter<statusObj>();

  constructor() {}

  ngOnInit(): void {}

  onStatusChange(ev: any) {
    if (ev.target.value) {
      const statusData: statusObj = {
        id: this.todoItem?.id ?? 0,
        status: ev.target.value,
      };
      this.statusChangeEvent.emit(statusData);
    }
  }
}
