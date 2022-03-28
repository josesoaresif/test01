import 'reflect-metadata';
import containerAdminOrderCreatePage from './container/inversify.adminOrderCreatePage';
import { AdminOrderCreatePageCreateApp } from './facades/AdminOrderCreatePageCreateApp';

declare let $: any;

$(document).ready(function() {
    const app = containerAdminOrderCreatePage.get(AdminOrderCreatePageCreateApp);
    app.start();
});
