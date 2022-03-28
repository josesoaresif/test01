import { injectable } from 'inversify';

import containerCheckoutCcardPage from '../container/inversify.checkoutCcardPage';
import { AppComponent } from '../decorators/AppComponent';
import { CheckoutCcardPage } from '../events/CheckoutCcardPage';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [CheckoutCcardPage], apps: []})
export class CheckoutCcardPageCreateApp extends MainApp implements FacadeInterface {  

    constructor() {
        super();
        this.container = containerCheckoutCcardPage;
    }
    start() {
    }
}
