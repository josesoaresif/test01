import { injectable } from 'inversify';

import containerCheckoutMultibancoPage from '../container/inversify.checkoutMultibancoPage';
import { AppComponent } from '../decorators/AppComponent';
import { CheckoutMultibancoPage } from '../events/CheckoutMultibancoPage';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [CheckoutMultibancoPage], apps: []})
export class CheckoutMultibancoPageCreateApp extends MainApp implements FacadeInterface {  

    constructor() {
        super();
        this.container = containerCheckoutMultibancoPage;
    }
    start() {
    }
}
