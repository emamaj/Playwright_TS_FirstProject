import { Page } from "@playwright/test";


export class PaymentPage {
    constructor(private page: Page) {}
    paymentButton = this.page.getByRole('link', { name: 'płatności' });
    paymentTransferReceiver = this.page.getByTestId('transfer_receiver');
    paymentAcceptForm = this.page.getByTestId('form_account_to');
    paymentFormAmount = this. page.getByTestId('form_amount');
    paymentClickButtonPage = this.page.getByRole('button', { name: 'wykonaj przelew' });
    paymentCloseButtonPage = this.page.getByTestId('close-button');

    paymentExpectedMessage = this.page.locator('#show_messages');
}