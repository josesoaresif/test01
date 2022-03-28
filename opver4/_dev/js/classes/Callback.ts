import { injectable } from "inversify";

import { AppInterface } from '../interfaces/AppInterface';
import { IfthenpayPaymentMethod } from '../interfaces/IfthenpayPaymentMethods';

@injectable()
export class Callback implements AppInterface {
    private callbackUrl: JQuery<HTMLElement>;
    private splitString: string;
    private mediaQuerieDesktop: string;

    constructor() {
        this.callbackUrl = $('#callbackUrl');
        this.splitString = '[ENTIDADE]';
        this.mediaQuerieDesktop = 'only screen and (min-width: 31.25em) and (max-width: 107.188em)'
    }

    private checkMediaQuerieDesktop(): string | null {
        if(matchMedia(this.mediaQuerieDesktop).matches) {
            this.splitString = '[CHAVE_ANTI_PHISHING]';
        }
        return null;
    }

    private setSplitString(): void {
        switch (new URLSearchParams(window.location.search).get('route').replace('extension/payment/', '')) {
            case IfthenpayPaymentMethod.MULTIBANCO:
                this.splitString = '[ENTIDADE]';
                this.checkMediaQuerieDesktop();
                break;
            case IfthenpayPaymentMethod.MBWAY:
                this.splitString = '[REFERENCIA]';
                this.checkMediaQuerieDesktop();
                break;
            case IfthenpayPaymentMethod.PAYSHOP:
                this.splitString = '[ID_CLIENTE]';
                this.checkMediaQuerieDesktop();
                break;
            case IfthenpayPaymentMethod.CCARD:
                this.splitString = '[REQUEST_ID]';
                this.checkMediaQuerieDesktop();
            default:
                break;
        }
    }

    init(): void {
        if (this.callbackUrl.length > 0) {
            this.setSplitString();
            const html = this.callbackUrl.html().split(this.splitString);
            this.callbackUrl.html(html[0] + "<br>" + this.splitString + html.slice(1).join(this.splitString));
            this.callbackUrl.show();
        }
    }
}
