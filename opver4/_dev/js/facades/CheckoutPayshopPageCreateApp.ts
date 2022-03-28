import { injectable } from 'inversify';

import containerCheckoutPayshopPage from '../container/inversify.checkoutPayshopPage';
import { AppComponent } from '../decorators/AppComponent';
import { CheckoutPayshopPage } from '../events/CheckoutPayshopPage';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [CheckoutPayshopPage], apps: []})
export class CheckoutPayshopPageCreateApp extends MainApp implements FacadeInterface {  

    constructor() {
        super();
        this.container = containerCheckoutPayshopPage;
    }
    start() {
    }
}
