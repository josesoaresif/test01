import { Container } from "inversify";

import { CheckoutCcardPage } from "../events/CheckoutCcardPage";
import { CheckoutCcardPageCreateApp } from "../facades/CheckoutCcardPageCreateApp";
import { HttpService } from "../services/HttpService";

const containerCheckoutCcardPage = new Container();

containerCheckoutCcardPage.bind<HttpService>(HttpService).toSelf();
containerCheckoutCcardPage.bind<CheckoutCcardPageCreateApp>(CheckoutCcardPageCreateApp).toSelf();
containerCheckoutCcardPage.bind<CheckoutCcardPage>(CheckoutCcardPage).toSelf();

export default containerCheckoutCcardPage;
