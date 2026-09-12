// pages/TodoPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly input: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByPlaceholder('What needs to be done?');
  }

  async goto() {
    await this.page.goto('');
  }

  async addTodo(text: string) {
    await this.input.fill(text);
    await this.input.press('Enter');
  }

  todoItem(text: string): Locator {
    return this.page.getByTestId('todo-item').filter({ hasText: text });
  }

  async completeTodo(text: string) {
    await this.todoItem(text).getByRole('checkbox').check();
  }

  async deleteTodo(text: string) {
    const item = this.todoItem(text);
    await item.hover();
    await item.getByLabel('Delete').click();
  }

  async expectTodoCount(count: number) {
    await expect(this.page.getByTestId('todo-item')).toHaveCount(count);
  }
}