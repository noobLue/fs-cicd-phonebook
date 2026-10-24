const { test, expect } = require('@playwright/test')

test('front page shows the phonebook entries', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Arto Hellas')).toBeVisible()
})