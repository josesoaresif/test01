import { injectable } from 'inversify';

import { RemoveBr } from '../classes/RemoveBr';
import containerAdminOrderInfoPage from '../container/inversify.adminOrderInfoPage';
import containerAdminOrderPage from '../container/inversify.adminOrderPage';
import { Event } from '../decorators/Event';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { SucessInterface } from '../interfaces/SuccessInterface';
import { HttpService } from '../services/HttpService';

import { Page } from './Page';

declare const $: any;

@injectable()
export class AdminOrderInfoPage extends Page {

    private toggleBtnWithImgIconLoadCss(toggle: boolean = false): void {
        if (toggle) {
            this.eventTarget.css({
                'width': '',
            });
            this.spinner.show();
            this.spinner.css({
                'display':'inline-block'
            }).children('img').css({
                'width': '50%'
            });
        } else {
            this.eventTarget.css({
                'width': '60px',
            });
            this.spinner.hide().next('img').css({
                'width': ''
            });
        }
    }

    private toggleBtnWithFontIconLoadCss(toggle: boolean = false): void {
        if (toggle) {
            this.eventTarget.css({
                'width': '60px',
            });
            this.spinner.show();
            this.spinner.css({
                'display':'inline-block'
            }).children('img').css({
                'width': '50%'
            });
        } else {
            this.eventTarget.css({
                'width': '',
                'padding': ''
            });
            this.spinner.hide().next('img').css({
                'width': ''
            });
        }
    }

    @Event('click', '#content', '#adminResendMbwayNotification')
    adminResendMbwayNotification(event: JQuery.TriggeredEvent): void {
        console.log(event);
        this.setEventDefault(event, true);
        this.spinner = this.eventTarget.children('.appSpinner');
        this.toggleBtnWithImgIconLoadCss(true);
        this.httpService = containerAdminOrderInfoPage.get(HttpService);
        this.httpService.setUrl(this.eventTarget.attr('href'));
        this.httpService.post({
        }).then((response: SucessInterface) => {
            alert(response.success);
            this.toggleBtnWithImgIconLoadCss();
            location.reload();
       }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            if (xhr.responseJSON as ErrorInterface) {
                alert(xhr.responseJSON.error);
            } else {
                alert(error);
            }
            this.toggleBtnWithImgIconLoadCss();
       });
    }
    @Event('click', '#content', '#adminResendEmailPaymentData')
    resendEmailPaymentData(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, true);
        this.spinner = this.eventTarget.children('.appSpinner');
        this.toggleBtnWithFontIconLoadCss(true);
        this.httpService = containerAdminOrderInfoPage.get(HttpService);
        this.httpService.setUrl(this.eventTarget.attr('href'));
        this.httpService.post({
        }).then((response: SucessInterface) => {
            alert(response.success);
            this.toggleBtnWithFontIconLoadCss();
       }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            if (xhr.responseJSON as ErrorInterface) {
                alert(xhr.responseJSON.error);
            } else {
                alert(error);
            }
            this.toggleBtnWithFontIconLoadCss();
       });
    }
    @Event('click', '#content', $('.pagination').find('span'))
    setRemoveBrFromHistory(event: JQuery.TriggeredEvent): void {
        console.log('funcionou');
        this.setEventDefault(event, false);
        containerAdminOrderPage.get(RemoveBr).init();
    }
}
