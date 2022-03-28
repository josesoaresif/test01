import { injectable } from "inversify";

import { AppInterface } from '../interfaces/AppInterface';

@injectable()
export class RemoveBr implements AppInterface {
    private panelOrderIfthenpay: JQuery<HTMLElement>;
    private panelOrderIfthenpayHeader: JQuery<HTMLElement>;
    private panelOrderIfthenpayBody: JQuery<HTMLElement>;
    private readonly brTag = 'br';

    constructor() {
        
    }

    private removeBrFromHeader(): void {
        this.panelOrderIfthenpayHeader.find(this.brTag).remove();
    }

    private removeBrFromBody(): void {
        this.panelOrderIfthenpayBody.find(this.brTag).remove();
        this.panelOrderIfthenpayBody.find('div.paymentLogo').css('margin-bottom', '10px').find(this.brTag).remove();
        this.panelOrderIfthenpayBody.find('div.paymentData').find(this.brTag).remove().find('ul.list-group')
            .find(this.brTag).remove().find('li.list-group-item').find(this.brTag).remove();
    }

    
    init(): void {
        setTimeout(() => { 
            this.panelOrderIfthenpay = $('div.panel-order-ifthenpay');
            this.panelOrderIfthenpayHeader = this.panelOrderIfthenpay.find('div.panel-heading');
            this.panelOrderIfthenpayBody = this.panelOrderIfthenpay.find('div.panel-body');
            if (this.panelOrderIfthenpay.length > 0) {
                this.removeBrFromHeader();
                this.removeBrFromBody();
                this.panelOrderIfthenpay.find(this.brTag).remove();
                console.log('removed')
            }
         }, 5000);
    }
}
