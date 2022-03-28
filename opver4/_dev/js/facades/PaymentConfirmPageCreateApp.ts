import { injectable } from 'inversify';

import { MbwayCountdown } from '../classes/MbwayCountDown';
import containerPaymentConfirmPage from '../container/inversify.PaymentConfirmPage';
import { AppComponent } from '../decorators/AppComponent';
import { SuccessPage } from '../events/SuccessPage';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [SuccessPage], apps: [MbwayCountdown]})
export class PaymentConfirmPageCreateApp extends MainApp implements FacadeInterface {  

    constructor() {
        super();
        this.container = containerPaymentConfirmPage;
    }
    start() {
    }
}
