import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private fetch: Function = window.fetch.bind(window)) {}

  async getTodos(): Promise<string[]> {
    const response = await this.fetch('/todo');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }
}
