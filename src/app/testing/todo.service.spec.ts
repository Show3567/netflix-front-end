import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

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
    expect(fetchSpy).toHaveBeenCalledWith('/todos');
  });
  it('handles an HTTP error when getting the to-dos', async () => {
    // Arrange
    const fetchSpy = jasmine.createSpy('fetch').and.returnValue(errorResponse);
    const todoService = new TodoService(fetchSpy);
    let error;
    try {
      await todoService.getTodos();
    } catch (e) {
      error = e;
    }
    // Assert
    expect(error).toEqual(new Error('HTTP error: 404 Not Found'));
    expect(fetchSpy).toHaveBeenCalledWith('/todos');
  });
});
