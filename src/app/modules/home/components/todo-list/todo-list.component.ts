import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public taskList: Array <TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  public setEmitTaskList(event: string) {
    this.taskList.push({task: event, checked: false});
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
  const confirm = window.confirm("Are you sure you want to delete all tasks?");

    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm("Task is empty. Are you sure you want to delete?");

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
