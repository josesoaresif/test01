import { injectable } from "inversify";

import { AppInterface } from '../interfaces/AppInterface';
import { IfthenpayPaymentMethod } from '../interfaces/IfthenpayPaymentMethods';
import { PhpVariablesInterface } from "../interfaces/PhpVariablesInterface";

declare const $: any;
declare const phpVariables: PhpVariablesInterface

@injectable()
export class InsertResendPaymentDataButton implements AppInterface {
    private faPrintBtn: JQuery<HTMLElement>;


    constructor() {
        this.faPrintBtn = $('.fa-print');
    }

    private getSpinnerHtml(): string {
        return `<div class="appSpinner" style="display:none"><img src="${phpVariables.catalogUrl}${phpVariables.ovalSvgUrl}"/></div>`;
    }

    init(): void {
        if (phpVariables.paymentMethod === IfthenpayPaymentMethod.MBWAY) {
            if ($('#adminResendMbwayNotification').length === 0) {
                $(`<a id="adminResendMbwayNotification" href="${phpVariables.resendMbwayNotificationUrl}" data-toggle="tooltip" 
                    data-paymentdata=${phpVariables.paymentMethod} title="${phpVariables.paymentMethodLanguage.adminResendMbwayNotification}" 
                    class="btn btn-warning" style="width: 60px;margin-right: 5px;padding:0px">
                    <img src="${phpVariables.catalogUrl}${phpVariables.mbwaySvgUrl}" class="icon" 
                    alt="${IfthenpayPaymentMethod.MBWAY} logo" style="pointer-events: none;">${this.getSpinnerHtml()}</a>`)
                .insertBefore(this.faPrintBtn.parent());
            }
        }
        if (phpVariables.paymentMethod !== IfthenpayPaymentMethod.CCARD && phpVariables.paymentMethod !== IfthenpayPaymentMethod.MBWAY) {
            console.log(phpVariables.paymentMethod);
            if ($('#adminResendEmailPaymentData').length === 0) {
                $(`<a id="adminResendEmailPaymentData" href="${phpVariables.resendPaymentDataUrl}" data-toggle="tooltip" 
                    data-paymentdata=${phpVariables.paymentMethod} title="${phpVariables.paymentMethodLanguage.resendPaymentData}" class="btn btn-warning"
                    style="margin-right: 5px;"><i class="fa fa-envelope" style="pointer-events: none;">
                    </i>${this.getSpinnerHtml()}</a>`
                )
                .insertBefore(this.faPrintBtn.parent());
            }
        }
    }
}
