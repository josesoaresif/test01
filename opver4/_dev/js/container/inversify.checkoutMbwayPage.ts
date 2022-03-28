import { Container } from "inversify";
import { CheckoutMbwayPage } from "../events/CheckoutMbwayPage";
import { CheckoutMbwayPageCreateApp } from "../facades/CheckoutMbwayPageCreateApp";
import { HttpService } from "../services/HttpService";
import { MbwayService } from '../services/MbwayService';

const containerCheckoutMbwayPage = new Container();

containerCheckoutMbwayPage.bind<HttpService>(HttpService).toSelf();
containerCheckoutMbwayPage.bind<CheckoutMbwayPageCreateApp>(CheckoutMbwayPageCreateApp).toSelf();
containerCheckoutMbwayPage.bind<MbwayService>(MbwayService).toSelf();
containerCheckoutMbwayPage.bind<CheckoutMbwayPage>(CheckoutMbwayPage).toSelf();

export default containerCheckoutMbwayPage;
