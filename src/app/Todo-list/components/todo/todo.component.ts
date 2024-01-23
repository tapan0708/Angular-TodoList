import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo, statusObj } from '../../models/todo-interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  id: number = 0;
  todoListData: Todo[] = [];
  submittedListData: Todo[] = [];
  InReviewListData: Todo[] = [];
  InProgressListData: Todo[] = [];
  CompletedListData: Todo[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setTodoForm();
    this.getListDataFormLocal();
    this.filterTodoData();
  }

  setTodoForm() {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
  }

  onSubmitTodoForm() {
    if (this.todoForm.valid) {
      let listData: Todo = {
        id: ++this.id,
        title: this.todoForm.value.title,
        desc: this.todoForm.value.desc,
        status: 'submitted',
      };
      this.actionsAfterSubmit(listData);
    }
  }

  actionsAfterSubmit(listData: Todo) {
    this.todoForm.reset();
    this.setListDataInLocal(listData);
    this.getListDataFormLocal();
    this.filterTodoData();
  }

  setListDataInLocal(Data: Todo): void {
    this.setDataInLocalStorage(Data.id.toString(), JSON.stringify(Data));
  }

  setDataInLocalStorage(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  getListDataFormLocal(): void {
    let keys = Object.keys(localStorage);
    let listArray: any = [];
    for (let i = 0; i < keys.length; i++) {
      let value = localStorage.getItem(keys[i]);
      listArray.push(value);
      this.todoListData = listArray.map(JSON.parse);
    }
  }

  handleStatusChange(statusObj: statusObj) {
    this.updateLocalStorageData(statusObj);
    this.getListDataFormLocal();
    this.filterTodoData();
  }

  updateLocalStorageData(statusData: statusObj) {
    let existingData = JSON.parse(
      localStorage.getItem(statusData.id.toString()) ?? ''
    );
    existingData.status = statusData.status;
    localStorage.setItem(
      statusData.id.toString(),
      JSON.stringify(existingData)
    );
  }

  filterTodoData() {
    this.submittedListData = this.todoListData.filter(
      (element) => element.status == 'submitted'
    );

    this.InReviewListData = this.todoListData.filter(
      (element) => element.status == 'review'
    );

    this.InProgressListData = this.todoListData.filter(
      (element) => element.status == 'progress'
    );

    this.CompletedListData = this.todoListData.filter(
      (element) => element.status == 'complete'
    );
  }
}
