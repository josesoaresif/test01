import { injectable } from 'inversify';

import containerCheckoutMbwayPage from '../container/inversify.checkoutMbwayPage';
import { Event } from '../decorators/Event';
import { ConfirmPaymentInterface } from '../interfaces/ConfirmPaymentInterface';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { HttpService } from '../services/HttpService';
import { MbwayService } from '../services/MbwayService';

import { Page } from './Page';

declare let $: any;

@injectable()
export class CheckoutMbwayPage extends Page {

    private mbwayService: MbwayService;

    constructor(mbwayService: MbwayService) {
        super();
        this.mbwayService = mbwayService;

    }
    
    @Event('click', '#button-confirm')
    confirmPayment(event: JQuery.TriggeredEvent): void {
        console.log(event)
        this.setEventDefault(event, true);
     
        if (this.mbwayService.validateMbwayInputPhone()) {
            $('#button-confirm').button('loading');
            this.httpService = containerCheckoutMbwayPage.get(HttpService);
            this.httpService.setUrl('index.php?route=extension/payment/mbway/confirm');
            this.httpService.post({
                mbwayInputPhone: this.mbwayService.mbwayPhoneVal
            }).then((response: ConfirmPaymentInterface) => {
                this.eventTarget.button(<any>'reset');
                if (response.redirect) {
                    location = response.redirect;
                }
            }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
                if (xhr.responseJSON as ErrorInterface) {
                    console.log(xhr.responseJSON.error);
                    alert(xhr.responseJSON.error);
                } else {
                    console.log(xhr);
                    alert(error);
                }
            });
        }        
    }
}
