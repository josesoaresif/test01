import containerAdminConfigPage from '../container/inversify.adminConfigPage';
import { Event } from '../decorators/Event';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { SucessInterface } from '../interfaces/SuccessInterface';
import { HttpService } from '../services/HttpService';

import { Page } from './Page';

declare const $: any;

export class AdminConfigPage extends Page {
    
    private getUrlParam(type: string): string {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(type);
    }
    

    @Event('change', '#ifthenpayMultibancoEntidade')
    changeEntidade(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, false);
        this.spinner = this.eventTarget.next('.appSpinner');
        const containerSubEntidade = $('#ifthenpayMultibancoSubentidade');
        this.spinner.show();
        this.httpService = containerAdminConfigPage.get(HttpService);
        this.httpService.setUrl(`index.php?route=extension/payment/multibanco/getSubEntidade&user_token=${this.getUrlParam('user_token')}`);
        this.httpService.post({
            entidade: $(event.target).val(),
        }).then((response: Array<string>) => {
            containerSubEntidade.find('option').remove();
            Object.keys(response).forEach(key => {
                response[key].SubEntidade.forEach((subEntidade) => {
                    this.documentFragment.append($(`<option value="${subEntidade}">${subEntidade}</option>`));
                });
            });
            containerSubEntidade.append(this.documentFragment);
            this.spinner.hide();
        }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            if (xhr.responseJSON as ErrorInterface) {
                alert(xhr.responseJSON.error);
            } else {
                alert(error);
            }
            this.spinner.hide();
        });
    }

    @Event('click', '#resetIfthenpayAccount')
    resetIfthenpayAccount(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, true);
        this.spinner = this.eventTarget.next('.appSpinner');
        this.spinner.show();
        this.httpService = containerAdminConfigPage.get(HttpService);
        this.httpService.setUrl(this.eventTarget.attr('href'));
        this.httpService.post({}).then((response: SucessInterface) => {
            if (response.success) {
                this.spinner.hide();
                location.reload();
            } else {
                alert(response.validationError);
            }
        }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            if (xhr.responseJSON as ErrorInterface) {
                alert(xhr.responseJSON.error);
            } else {
                alert(error);
            }
            this.spinner.hide();
        });
    }
    @Event('click', '#button-copy, #button-copy-payment-status')
    copyCronUrl(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, true);
        this.eventTarget.parent().prev().select();
	    document.execCommand('copy');
    }

    @Event('click', '#requestNewAccount')
    requestNewAccount(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, true);
        this.spinner = this.eventTarget.next('.appSpinner');
        this.spinner.show();
        this.httpService = containerAdminConfigPage.get(HttpService);
        this.httpService.setUrl(this.eventTarget.attr('href'));
        this.httpService.post({}).then((response: SucessInterface) => {
            alert(response.success);
            this.eventTarget.parent().remove();
        }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            if (xhr.responseJSON as ErrorInterface) {
                alert(xhr.responseJSON.error);
            } else {
                alert(error);
            }
            this.spinner.hide();
        });
    }

    @Event('click', '#requestDynamicMultibancoAccount')
    requestDynamicMultibancoAccount(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, true);
        this.spinner = this.eventTarget.next('.appSpinner');
        this.spinner.show();
        this.httpService = containerAdminConfigPage.get(HttpService);
        this.httpService.setUrl(this.eventTarget.attr('href'));
        this.httpService.post({}).then((response: SucessInterface) => {
            alert(response.success);
            this.eventTarget.parent().parent().remove();
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
