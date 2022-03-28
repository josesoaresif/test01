import 'reflect-metadata';
import containerAdminOrderInfoPage from './container/inversify.adminOrderInfoPage';
import { AdminOrderInfoPageCreateApp } from './facades/AdminOrderInfoPageCreateApp';

declare let $: any;

$(document).ready(function() {
    const app = containerAdminOrderInfoPage.get(AdminOrderInfoPageCreateApp);
    app.start();
});
