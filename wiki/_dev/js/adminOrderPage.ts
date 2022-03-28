import 'reflect-metadata';

import containerAdminOrderPage from './container/inversify.adminOrderPage';
import { AdminOrderPageCreateApp } from './facades/AdminOrderPageCreateApp';

declare let $: any;

$(document).ready(function() {
    const app = containerAdminOrderPage.get(AdminOrderPageCreateApp);
    app.start();
});
