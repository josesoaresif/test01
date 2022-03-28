import { Container } from "inversify";

import { ChangeEventsAdminOrderCreate } from '../classes/ChangeEventsAdminOrderCreate';
import { CheckRadioButton } from '../classes/CheckRadioButton';
import { AdminOrderCreatePage } from '../events/AdminOrderCreatePage';
import { AdminOrderCreatePageCreateApp } from '../facades/AdminOrderCreatePageCreateApp';
import { CookieService } from '../services/CookieService';
import { MbwayService } from '../services/MbwayService';

const containerAdminOrderCreatePage = new Container();

containerAdminOrderCreatePage.bind<CookieService>(CookieService).toSelf();
containerAdminOrderCreatePage.bind<CheckRadioButton>(CheckRadioButton).toSelf();
containerAdminOrderCreatePage.bind<ChangeEventsAdminOrderCreate>(ChangeEventsAdminOrderCreate).toSelf();
containerAdminOrderCreatePage.bind<MbwayService>(MbwayService).toSelf();
containerAdminOrderCreatePage.bind<AdminOrderCreatePage>(AdminOrderCreatePage).toSelf();
containerAdminOrderCreatePage.bind<AdminOrderCreatePageCreateApp>(AdminOrderCreatePageCreateApp).toSelf();

export default containerAdminOrderCreatePage;
