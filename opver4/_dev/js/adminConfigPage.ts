import 'reflect-metadata';
import containerAdminConfigPage from './container/inversify.adminConfigPage';
import { AdminConfigPageCreateApp } from './facades/AdminConfigPageCreateApp';

declare let $: any;

$(document).ready(function() {
    const app = containerAdminConfigPage.get(AdminConfigPageCreateApp);
    app.start();
});
