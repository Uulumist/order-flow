import {test, expect} from '@playwright/test';
import {faker} from "@faker-js/faker/locale/en_GB";

test.beforeEach(async ({page}) => {
  const path = require('path');
  const filePath = `file://${path.resolve(process.env.APP_URL)}`;
  await page.goto(filePath);
})

test.describe('Order-flow tests', () => {

  test('check button disabled', async ({page}) => {
    await expect(page.getByTestId('submit-order')).toBeDisabled();
  });

  test('check button enabled', async ({page}) => {
    const userNameField = await page.getByTestId('username');
    const userEmailField = await page.getByTestId('email');
    await userNameField.fill(faker.person.firstName())
    await userEmailField.fill(faker.internet.email())
    await expect(page.getByTestId('submit-order')).toBeEnabled();
  });

  test('check PopUp visible', async ({page}) => {
    const userNameField = await page.getByTestId('username');
    const userEmailField = await page.getByTestId('email');
    const popUp = await page.locator('css=#popup-message')
    await userNameField.fill(faker.person.firstName())
    await userEmailField.fill(faker.internet.email())
    await page.getByTestId('submit-order').click();
    await expect(popUp).toBeEnabled();
  });
});
