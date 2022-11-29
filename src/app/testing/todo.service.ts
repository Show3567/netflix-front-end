import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private fetch: Function = window.fetch.bind(window)) {}

  async getTodos(): Promise<string[]> {
    const response: Response = await this.fetch('/todos');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }
}
