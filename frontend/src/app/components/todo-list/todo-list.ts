import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, Priority } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList implements OnInit {

  todos: Todo[] = [];
  newTitle = '';
  newPriority: Priority = 'MEDIUM';

  priorities: Priority[] = ['LOW', 'MEDIUM', 'HIGH'];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }

  addTodo() {
    if (this.newTitle.trim()) {
      this.todoService.addTodo({
        title: this.newTitle, 
        completed: false,
        priority: this.newPriority
      }).subscribe(todo => {
        this.todos.push(todo);
        this.newTitle = '';
        this.newPriority = 'MEDIUM';
      });
    }
  }

  toggle(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  delete(todo: Todo) {
    this.todoService.deleteTodo(todo.id!).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    });
  }

  getPriorityClass(priority: Priority): string {
    return `priority-${priority.toLowerCase()}`;
  }

  getPriorityLabel(priority: Priority): string {
    const labels = {
      'LOW': '🟢 Basse',
      'MEDIUM': '🟡 Moyenne',
      'HIGH': '🔴 Haute'
    };
    return labels[priority] || labels['MEDIUM'];
  }
  
  getPriority(todo: Todo): Priority {
    return todo.priority || 'MEDIUM';
  }
}