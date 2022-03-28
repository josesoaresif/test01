import 'reflect-metadata';

import containerCheckoutCcardPage from './container/inversify.checkoutCcardPage';
import { CheckoutCcardPageCreateApp } from './facades/CheckoutCcardPageCreateApp';

declare const $: any;

$(document).ready(function() {
    const app = containerCheckoutCcardPage.get(CheckoutCcardPageCreateApp);
    app.start();
});
