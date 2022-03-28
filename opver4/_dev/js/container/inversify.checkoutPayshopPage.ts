import { Container } from "inversify";

import { CheckoutPayshopPage } from "../events/CheckoutPayshopPage";
import { CheckoutPayshopPageCreateApp } from "../facades/CheckoutPayshopPageCreateApp";
import { HttpService } from "../services/HttpService";

const containerCheckoutPayshopPage = new Container();

containerCheckoutPayshopPage.bind<HttpService>(HttpService).toSelf();
containerCheckoutPayshopPage.bind<CheckoutPayshopPageCreateApp>(CheckoutPayshopPageCreateApp).toSelf();
containerCheckoutPayshopPage.bind<CheckoutPayshopPage>(CheckoutPayshopPage).toSelf();

export default containerCheckoutPayshopPage;
