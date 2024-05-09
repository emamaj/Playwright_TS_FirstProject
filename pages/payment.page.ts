import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  paymentTransferReceiver = this.page.getByTestId('transfer_receiver');
  paymentAcceptForm = this.page.getByTestId('form_account_to');
  paymentFormAmount = this.page.getByTestId('form_amount');
  paymentClickButtonPage = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  paymentCloseButtonPage = this.page.getByTestId('close-button');

  paymentExpectedMessage = this.page.locator('#show_messages');

  async makeTransfer(
    transferReceiver: string,
    accountNumber: string,
    transferAmount: string,
  ) {
    await this.paymentTransferReceiver.fill(transferReceiver);
    await this.paymentAcceptForm.fill(accountNumber);
    await this.paymentFormAmount.fill(transferAmount);
    await this.paymentClickButtonPage.click();
    await this.paymentCloseButtonPage.click();
  }
}
