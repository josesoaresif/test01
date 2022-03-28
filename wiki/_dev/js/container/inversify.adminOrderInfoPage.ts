import { Container } from "inversify";

import { InsertResendPaymentDataButton } from '../classes/InsertResendPaymentDataButton';
import { AdminOrderInfoPage } from '../events/AdminOrderInfoPage';
import { AdminOrderInfoPageCreateApp } from '../facades/AdminOrderInfoPageCreateApp';
import { MbwayService } from '../services/MbwayService';
import { HttpService } from '../services/HttpService';

const containerAdminOrderInfoPage = new Container();

containerAdminOrderInfoPage.bind<HttpService>(HttpService).toSelf();
containerAdminOrderInfoPage.bind<MbwayService>(MbwayService).toSelf();
containerAdminOrderInfoPage.bind<InsertResendPaymentDataButton>(InsertResendPaymentDataButton).toSelf();
containerAdminOrderInfoPage.bind<AdminOrderInfoPage>(AdminOrderInfoPage).toSelf();
containerAdminOrderInfoPage.bind<AdminOrderInfoPageCreateApp>(AdminOrderInfoPageCreateApp).toSelf();

export default containerAdminOrderInfoPage;
