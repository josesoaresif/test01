import { Container } from "inversify";

import { CheckoutMultibancoPage } from "../events/CheckoutMultibancoPage";
import { CheckoutMultibancoPageCreateApp } from '../facades/CheckoutMultibancoPageCreateApp';
import { HttpService } from "../services/HttpService";

const containerCheckoutMultibancoPage = new Container();

containerCheckoutMultibancoPage.bind<HttpService>(HttpService).toSelf();
containerCheckoutMultibancoPage.bind<CheckoutMultibancoPageCreateApp>(CheckoutMultibancoPageCreateApp).toSelf();
containerCheckoutMultibancoPage.bind<CheckoutMultibancoPage>(CheckoutMultibancoPage).toSelf();

export default containerCheckoutMultibancoPage;
