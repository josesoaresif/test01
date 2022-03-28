import { Container } from "inversify";

import { MbwayCountdown } from '../classes/MbwayCountDown';
import { SuccessPage } from '../events/SuccessPage';
import { PaymentConfirmPageCreateApp } from "../facades/PaymentConfirmPageCreateApp";
import { HttpService } from '../services/HttpService';


const containerPaymentConfirmPage = new Container();

containerPaymentConfirmPage.bind<MbwayCountdown>(MbwayCountdown).toSelf();
containerPaymentConfirmPage.bind<HttpService>(HttpService).toSelf();
containerPaymentConfirmPage.bind<SuccessPage>(SuccessPage).toSelf();
containerPaymentConfirmPage.bind<PaymentConfirmPageCreateApp>(PaymentConfirmPageCreateApp).toSelf();

export default containerPaymentConfirmPage;
