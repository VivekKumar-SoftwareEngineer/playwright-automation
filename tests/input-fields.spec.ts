import { test, expect } from '@playwright/test'

test.beforeEach( async({page}) => {
    await page.goto('/');
})

test('Update pet type', async({page}) => {

    await page.getByText('Pet Types').click();
    const petTypesHeading = page.getByRole('heading', { name: 'Pet Types'});

    await expect(petTypesHeading).toHaveText('Pet Types');

    const catRow = page.locator('table tr').nth(1);
    await expect(catRow.locator('input')).toHaveValue('cat');
    await catRow.getByRole('button', { name: 'Edit'}).click();

    await page.waitForTimeout(1000);

    const editPetTypesHeading = page.getByRole('heading', { name: 'Edit Pet Type'});

    await expect(editPetTypesHeading).toHaveText('Edit Pet Type');

    await page.locator('#name').fill('rabbit');

    await page.getByRole('button', { name: 'Update'}).click();

    await page.waitForResponse('**/api/pettypes/*');

    await page.waitForResponse('**/api/pettypes');

    await page.waitForTimeout(1000);

    await expect(petTypesHeading).toHaveText('Pet Types');

    const firstRow = page.locator('table tr').nth(1);
    await expect(firstRow.locator('input')).toHaveValue('rabbit');

    await firstRow.getByRole('button', { name: 'Edit'}).click();

    await page.waitForTimeout(1000);

    await expect(editPetTypesHeading).toHaveText('Edit Pet Type');

    await page.locator('#name').fill('cat');

    await page.getByRole('button', { name: 'Update'}).click();

    await page.waitForResponse('**/api/pettypes/*');
    await page.waitForResponse('**/api/pettypes');

    await page.waitForTimeout(1000);

    await expect(petTypesHeading).toHaveText('Pet Types');

    await expect(firstRow.locator('input')).toHaveValue('cat');
})