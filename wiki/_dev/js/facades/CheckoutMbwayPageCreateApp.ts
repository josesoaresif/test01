import { injectable } from 'inversify';

import containerCheckoutMbwayPage from '../container/inversify.checkoutMbwayPage';
import { AppComponent } from '../decorators/AppComponent';
import { CheckoutMbwayPage } from '../events/CheckoutMbwayPage';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [CheckoutMbwayPage], apps: []})
export class CheckoutMbwayPageCreateApp extends MainApp implements FacadeInterface {  

    constructor() {
        super();
        this.container = containerCheckoutMbwayPage;
    }
    start() {
    }
}
