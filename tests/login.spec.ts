import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page)
  });

  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;
    const expectedUserId = 'Jan Demobankowy';

    //Act
    await loginPage.login(userID, userPassword)

    //Assert
    const pulpitPage = new PulpitPage(page)
    await expect(pulpitPage.pulpitUserName).toHaveText(expectedUserId);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const incorrectUserLogin = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await loginPage.incorrectLogin(incorrectUserLogin, '')
 
    //Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userID = loginData.userID;
    const userPassword = 'Pword';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.passwordInput.blur();
 
    //Assert
    await expect(loginPage.errorMessage).toHaveText(expectedErrorMessage);
  });
});
