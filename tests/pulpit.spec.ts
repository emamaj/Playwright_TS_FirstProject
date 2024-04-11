import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  })

  test('Quick payment with correct data', async ({ page }) => {
    //Arrange
    const userID = 'testerLO';
    const userPassword = 'password';
    const receiverID = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTitleReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTitleReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('Successful mobile top-up', async ({ page }) => {
    //Arange
    const userID = 'testerLo';
    const userPassword = 'Password';
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '25';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    //Act
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#widget_1_topup_agreement').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
