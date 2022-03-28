import 'reflect-metadata';

import containerCheckoutPayshopPage from './container/inversify.checkoutPayshopPage';
import { CheckoutPayshopPageCreateApp } from './facades/CheckoutPayshopPageCreateApp';

declare const $: any;

$(document).ready(function() {
    const app = containerCheckoutPayshopPage.get(CheckoutPayshopPageCreateApp);
    app.start();
});
