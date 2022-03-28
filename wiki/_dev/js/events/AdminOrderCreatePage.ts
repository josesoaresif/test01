import { injectable } from 'inversify';

import { Event } from '../decorators/Event';
import { IfthenpayPaymentMethod } from '../interfaces/IfthenpayPaymentMethods';
import { CookieService } from '../services/CookieService';
import { MbwayService } from '../services/MbwayService';

import { Page } from './Page';

declare const $: any;

@injectable()
export class AdminOrderCreatePage extends Page {
        
    private mbwayService: MbwayService;
    private cookieService: CookieService;
    private readonly mbwayCookieName = 'mbwayInputPhone';

    constructor(mbwayService: MbwayService, cookieService: CookieService) {
        super();
        this.mbwayService = mbwayService;
        this.cookieService = cookieService;

    }

    @Event('change', '#input-payment-method')
    changePaymentMethod(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, false);
        const ifthenpayMbwayPhoneDiv = $('#ifthenpayMbwayPhoneDiv');
        if (this.eventTarget.val() === IfthenpayPaymentMethod.MBWAY && ifthenpayMbwayPhoneDiv.length === 0) {
            $(this.mbwayService.getMbwayInput()).insertAfter(this.eventTarget.parent());
        }
        if (this.eventTarget.val() !== IfthenpayPaymentMethod.MBWAY && ifthenpayMbwayPhoneDiv.length > 0) {
            ifthenpayMbwayPhoneDiv.remove();
        }
    }
    @Event('click', '#button-save')
    checkMbwayValidation(event:JQuery.TriggeredEvent): void {
        this.setEventDefault(event, false);
        if($('#input-payment-method').val() === IfthenpayPaymentMethod.MBWAY) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            this.setEventDefault(event, true);
            if (this.mbwayService.validateMbwayInputPhone()) {
                console.log(this.mbwayService.mbwayPhoneVal)
                this.cookieService.setCookie(this.mbwayCookieName, this.mbwayService.mbwayPhoneVal, 1);
                $._data( this.eventTarget[0], "events" ).click[1].handler();
                this.cookieService.deleteCookie(this.mbwayCookieName);
            }
        }
        this.cookieService.deleteCookie(this.mbwayCookieName);
    }
}
