import 'reflect-metadata';

import containerCheckoutMbwayPage from './container/inversify.checkoutMbwayPage';
import { CheckoutMbwayPageCreateApp } from './facades/CheckoutMbwayPageCreateApp';

declare const $: any;

$(document).ready(function() {
    const app = containerCheckoutMbwayPage.get(CheckoutMbwayPageCreateApp);
    app.start();
}); 
