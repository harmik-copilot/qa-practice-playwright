import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
  todoPage = new TodoPage(page);
  await todoPage.goto();
});

test('adds a new todo item', async ({ page }) => {
  await todoPage.addTodo('Buy milk');
  await expect(page.getByTestId('todo-title')).toHaveText('Buy milk');
});

test('marks a todo item as completed', async () => {
  await todoPage.addTodo('Write test report');
  await todoPage.completeTodo('Write test report');
  await expect(todoPage.todoItem('Write test report')).toHaveClass(/completed/);
});

test('deletes a todo item', async () => {
  await todoPage.addTodo('Temporary task');
  await todoPage.deleteTodo('Temporary task');
  await todoPage.expectTodoCount(0);
});