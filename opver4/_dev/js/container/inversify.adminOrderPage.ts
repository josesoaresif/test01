import { Container } from "inversify";

import { RemoveBr } from '../classes/RemoveBr';
import { AdminOrderPageCreateApp } from '../facades/AdminOrderPageCreateApp';

const containerAdminOrderPage = new Container();

containerAdminOrderPage.bind<RemoveBr>(RemoveBr).toSelf();
containerAdminOrderPage.bind<AdminOrderPageCreateApp>(AdminOrderPageCreateApp).toSelf();

export default containerAdminOrderPage;
