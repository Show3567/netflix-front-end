import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private fetch: Function = window.fetch.bind(window)) {}

  async getTodos(): Promise<string[]> {
    const response: Response = await this.fetch('/todo');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }
}

// Fake todos and response object
const todos = ['shop groceries', 'mow the lawn', 'take the cat to the vet'];
const okResponse = new Response(JSON.stringify(todos), {
  status: 200,
  statusText: 'OK',
});
const errorResponse = new Response('Not Found', {
  status: 404,
  statusText: 'Not Found',
});

describe('TodoService', () => {
  it('should send request when trigger getTodos', async () => {
    const fetchSpy = jasmine.createSpy('fetch').and.returnValue(okResponse);
    const todoService = new TodoService(fetchSpy);

    const actualResault = await todoService.getTodos();

    expect(actualResault).toEqual(todos);
    expect(fetchSpy).toHaveBeenCalledWith('/todo');
  });
});
