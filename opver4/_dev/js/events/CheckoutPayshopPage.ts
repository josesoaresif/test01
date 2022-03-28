import containerCheckoutPayshopPage from '../container/inversify.checkoutPayshopPage';
import { Event } from '../decorators/Event';
import { ConfirmPaymentInterface } from '../interfaces/ConfirmPaymentInterface';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { HttpService } from '../services/HttpService';

import { Page } from './Page';

declare let $: any;

export class CheckoutPayshopPage extends Page {

    @Event('click', '#button-confirm')
    confirmPayment(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, true);
        $('#button-confirm').button('loading');
        this.httpService = containerCheckoutPayshopPage.get(HttpService);
        this.httpService.setUrl('index.php?route=extension/payment/payshop/confirm');
        this.httpService.post({}).then((response: ConfirmPaymentInterface) => {
            this.eventTarget.button(<any>'reset');
            if (response.redirect) {
                location = response.redirect;
            }
        }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            if (xhr.responseJSON as ErrorInterface) {
                alert(xhr.responseJSON.error);
            } else {
                alert(error);
            }
        });
    }
}
