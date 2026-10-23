import { test, expect } from '@playwright/test'

test.beforeEach( async({page}) => {
    await page.goto('/');
})

test('Update pet type', async({page}) => {

    await page.getByText('Pet Types').click();

    await expect(page.getByRole('heading')).toHaveText('Pet Types');

    await page.getByRole('row', { name: 'cat' }).getByRole('button', { name: 'Edit'}).click();

    await expect(page.getByRole('heading')).toHaveText('Edit Pet Type');

    await expect(page.locator('#name')).toHaveValue('cat');

    await page.locator('#name').fill('rabbit');

    await page.getByRole('button', { name: 'Update'}).click();

    await expect(page.getByRole('heading')).toHaveText('Pet Types');

    const firstRow = page.locator('table tr').nth(1);
    await expect(firstRow.locator('input')).toHaveValue('rabbit');

    await page.getByRole('row', { name: 'rabbit' }).getByRole('button', { name : 'Edit'}).click();

    await expect(page.getByRole('heading')).toHaveText('Edit Pet Type');

    await expect(page.locator('#name')).toHaveValue('rabbit');

    await page.locator('#name').fill('cat');

    await page.getByRole('button', { name: 'Update'}).click();

    await expect(page.getByRole('heading')).toHaveText('Pet Types');

    await expect(firstRow.locator('input')).toHaveValue('cat');
})