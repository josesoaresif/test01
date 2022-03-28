import 'reflect-metadata';

import containerCheckoutMultibancoPage from './container/inversify.checkoutMultibancoPage';
import { CheckoutMultibancoPageCreateApp } from './facades/CheckoutMultibancoPageCreateApp';

declare const $: any;

$(document).ready(function() {
    const app = containerCheckoutMultibancoPage.get(CheckoutMultibancoPageCreateApp);
    app.start();
});
