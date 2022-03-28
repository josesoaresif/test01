import 'reflect-metadata';

import containerPaymentConfirmPage from './container/inversify.PaymentConfirmPage';
import { PaymentConfirmPageCreateApp } from './facades/PaymentConfirmPageCreateApp';

declare const $: any;

$(document).ready(function() {
    const app = containerPaymentConfirmPage.get(PaymentConfirmPageCreateApp);
    app.start();
});
