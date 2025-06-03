import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000')
})

test('should redirect to ProductDetail page on click', async ({ page }) => {
  await page.getByLabel('close').click()
  await page.getByRole('link', { name: 'Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng' }).click()
  await expect(page).toHaveTitle('Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng')
})
