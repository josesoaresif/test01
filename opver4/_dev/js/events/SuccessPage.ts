import { MbwayCountdown } from '../classes/MbwayCountDown';
import containerPaymentConfirmPage from '../container/inversify.PaymentConfirmPage';
import { Event } from '../decorators/Event';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { SucessInterface } from '../interfaces/SuccessInterface';
import { HttpService } from '../services/HttpService';

import { Page } from './Page';

declare let $: any;
declare const window: any;

export class SuccessPage extends Page {
    private mbwayCountdownPanel: JQuery<HTMLElement>;
    
    @Event('click', '#resendMbwayNotificationMbway')
    resendMbwayNotification(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, true);
        clearInterval(window.mbwayInterval);
        clearInterval(window.mbwayInterval2);
        this.spinner = this.eventTarget.next('.appSpinner');
        this.mbwayCountdownPanel = $('#mbwayCountdownPanel');
        this.spinner.show();
        this.mbwayCountdownPanel.hide();
        this.httpService = containerPaymentConfirmPage.get(HttpService);
        this.httpService.setUrl(this.eventTarget.attr('href'));
        this.httpService.post({
        }).then((response: SucessInterface) => {
            containerPaymentConfirmPage.get(MbwayCountdown).init();
            alert(response.success);
            this.spinner.hide();
            this.mbwayCountdownPanel.show();
       }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            if (xhr.responseJSON as ErrorInterface) {
                alert(xhr.responseJSON.error);
            } else {
                alert(error);
            }
            this.spinner.hide();
       });
    }
}
