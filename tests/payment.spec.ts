import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const pulpitPage = new PulpitPage(page)
    await pulpitPage.sideMenu.paymentButton.click();
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const accountNumber = '12 3456 7894 5632 1000 9012 12345,';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    //Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.paymentTransferReceiver.fill(transferReceiver);
    await paymentPage.paymentAcceptForm.fill(accountNumber);
    await paymentPage.paymentFormAmount.fill(transferAmount);
    await paymentPage.paymentClickButtonPage.click();
    await paymentPage.paymentCloseButtonPage.click();

    //Assert
    await expect(paymentPage.paymentExpectedMessage).toHaveText(
      expectedMessage,
    );
  });
});
