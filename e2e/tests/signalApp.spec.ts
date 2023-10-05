import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('button', { name: 'data source DemoDataSource' }).click()
  await page.getByRole('button', { name: 'root package apps' }).click()
  await page.getByRole('button', { name: 'package MySignalApp' }).click()
  await page.getByRole('button', { name: 'file signalApp' }).click()
})

test('Start SignalApp', async ({ page }) => {
  await expect(page.getByRole('tab', { name: 'Home' })).toBeVisible()
})

test('run Create job', async ({ page }) => {
  await page.getByRole('button', { name: 'Open' }).click()
  await page.getByRole('button', { name: 'Open' }).click()
  await page.getByRole('button', { name: 'Start' }).click()
  await expect(
    page.getByText('Progress tracking not implemented')
  ).toBeVisible()

  // await page.getByRole('button', { name: 'Close case1' }).click()
  // await page.getByRole('button', { name: 'Open' }).click()
  // await expect(page.locator('.nsewdrag')).toHaveScreenshot({
  //   maxDiffPixelRatio: 0.25,
  // })
})
