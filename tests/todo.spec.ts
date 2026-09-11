import { test, expect } from '@playwright/test';

// This suite runs against Playwright's public TodoMVC demo app.
// Use it to practice: writing comment-first prompts for Copilot,
// reviewing generated locators/assertions, and watching these run in CI.

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('adds a new todo item', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Buy milk');
  await input.press('Enter');

  await expect(page.getByTestId('todo-title')).toHaveText('Buy milk');
});

test('marks a todo item as completed', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Write test report');
  await input.press('Enter');

  const todoItem = page.getByTestId('todo-item').filter({ hasText: 'Write test report' });
  await todoItem.getByRole('checkbox').check();

  await expect(todoItem).toHaveClass(/completed/);
});

test('deletes a todo item', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Temporary task');
  await input.press('Enter');

  const todoItem = page.getByTestId('todo-item').filter({ hasText: 'Temporary task' });
  await todoItem.hover();
  await todoItem.getByLabel('Delete').click();

  await expect(page.getByTestId('todo-item')).toHaveCount(0);
});

// TRY THIS WITH COPILOT:
// Open Copilot Chat and ask it to add a test here for:
// "Adding multiple todos, completing one, then filtering to show
// only 'Active' items — verify the completed item is hidden."
// Review the locator choices it picks before accepting.
