# Test Automation training from jaktestowac.pl

## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
  if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- cancelling Node process  
  hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>
- run Trace Viewer in zip file
  `npx playwright show-trace trace.zip`

## Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```

## Visual Studio Code

- Preview: for README.md
- Autosave: in File -> Auto Save
- Timeline: file context menu -> Open Timeline
- Formatting: editor -> context menu -> Format Document

## Playwright snippets

- test:
  ```javascript
  test('test description', async ({ page }) => {});
  ```
- describe:

  ```javascript
  //obiekt test dodany poniżej
  test.describe('Group description', () => {});
  ```

- running one test: `test.only`

### Locators

- `getByTestId` i.e. `getByTestId('login-input')` for element with `data-testid="login-input"`
- `getByRole` i.e. `getByRole('button', { name: 'wykonaj' })`
- `locator` i.e. `locator('#some-id')` (with `css` selector) for element with attribute `id="some-id"`

### Updating Playwright

- check if Playwright should be updated  
  `npm outdated @playwright/test`
- update Playwright  
  `npm i @playwright/test`
- update browsers  
  `npx playwright install`
- verify Playwright version  
  `npx @playwright/test --version`

## Other

### Chrome

- use English version!
- open DevTools <kbd>F12</kbd> or right click `Inspect`
- get selector: right click on element -> Copy -> Copy selector
- testing CSS selectors in Console: `$$('selector')`

### Prettier

- install Prettier
  `npm install --save-dev --save-exact prettier`
- configure Prettier

  - exlude files in `.prettierignore`

  ```
      package-lock.json
      playwright-report

  ```

  - set rules in `.prettierrc.json`

  ```
      {
         "singleQuote": true
      }
  ```

- run Prettier
  `npx prettier --write .`
