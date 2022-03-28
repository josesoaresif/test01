import containerCheckoutMultibancoPage from '../container/inversify.checkoutMultibancoPage';
import { Event } from '../decorators/Event';
import { HttpService } from '../services/HttpService';

import { Page } from './Page';
import { ConfirmPaymentInterface } from '../interfaces/ConfirmPaymentInterface';
import { ErrorInterface } from '../interfaces/ErrorInterface';

declare let $: any;

export class CheckoutMultibancoPage extends Page {
    
    @Event('click', '#button-confirm')
    confirmPayment(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, true);
        $('#button-confirm').button('loading');
        this.httpService = containerCheckoutMultibancoPage.get(HttpService);
        this.httpService.setUrl('index.php?route=extension/payment/multibanco/confirm');
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
