import { injectable } from "inversify";

import { AppInterface } from '../interfaces/AppInterface';
import { IfthenpayPaymentMethod } from '../interfaces/IfthenpayPaymentMethods';

@injectable()
export class CheckRadioButton implements AppInterface {
    private selectPaymentMethod: JQuery<HTMLElement>;


    constructor() {
        this.selectPaymentMethod = $('#input-payment-method');
    }

    init(): void {
        if (this.selectPaymentMethod.length > 0 && this.selectPaymentMethod.val() === IfthenpayPaymentMethod.MBWAY) {
            this.selectPaymentMethod.trigger('change');
        }
    }
}
