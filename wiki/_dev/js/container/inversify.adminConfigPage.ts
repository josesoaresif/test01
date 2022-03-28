import { Container } from "inversify";

import { Callback } from '../classes/Callback';
import { AdminConfigPage } from "../events/AdminConfigPage";
import { AdminConfigPageCreateApp } from "../facades/AdminConfigPageCreateApp";
import { HttpService } from "../services/HttpService";

const containerAdminConfigPage = new Container();

containerAdminConfigPage.bind<HttpService>(HttpService).toSelf();
containerAdminConfigPage.bind<Callback>(Callback).toSelf();
containerAdminConfigPage.bind<AdminConfigPage>(AdminConfigPage).toSelf();
containerAdminConfigPage.bind<AdminConfigPageCreateApp>(AdminConfigPageCreateApp).toSelf();

export default containerAdminConfigPage;
