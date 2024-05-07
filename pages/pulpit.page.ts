import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page)
  
  pulpitReceiverId = this.page.locator('#widget_1_transfer_receiver');
  pulpitTransferAmount = this.page.locator('#widget_1_transfer_amount');
  pulpitTransferTitle = this.page.locator('#widget_1_transfer_title');
  pulpitClickAcceptButton = this.page.getByRole('button', { name: 'wykonaj' });
  pulpitClickCloseButton = this.page.getByTestId('close-button');
  pulpitTopUpReceiver = this.page.locator('#widget_1_topup_receiver');
  pulpitTopUpAmount = this.page.locator('#widget_1_topup_amount');
  pulpitTopUpAgreement = this.page.locator('#widget_1_topup_agreement');
  pulpitTopUpClickButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });
  pulpitCloseUpButton = this.page.getByTestId('close-button');
  

  pulpitExpectedTitleReceiver = this.page.locator('#show_messages');
  pulpitTopUpExpectedMessage = this.page.locator('#show_messages');
  pulpitMoneyValueMessage = this.page.locator('#money_value');

  pulpitUserName = this.page.getByTestId('user-name');
}
