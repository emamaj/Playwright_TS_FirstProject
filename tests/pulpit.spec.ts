import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userID, userPassword);

    pulpitPage = new PulpitPage(page);
  });

  test('Quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverID = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTitleReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTitleReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await pulpitPage.properPayment(receiverID, transferAmount, transferTitle);

    //Assert
    await expect(pulpitPage.pulpitExpectedTitleReceiver).toHaveText(
      expectedMessage,
    );
  });

  test('Successful mobile top-up', async ({ page }) => {
    //Arange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '25';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    //Act
    await pulpitPage.paymentTopup(topUpReceiver, topUpAmount);

    //Assert
    await expect(pulpitPage.pulpitTopUpExpectedMessage).toHaveText(
      expectedMessage,
    );
  });

  test.only('Correct balance after successful mobile top-up', async ({ page }) => {
    //Arange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '25';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    //Act
    await pulpitPage.correctBalance(topUpReceiver, topUpAmount);

    //Assert
    await expect(pulpitPage.pulpitMoneyValueMessage).toHaveText(
      `${expectedBalance}`,
    );
  });
});
