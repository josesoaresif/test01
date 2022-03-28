import { injectable} from 'inversify';

import { InsertResendPaymentDataButton } from '../classes/InsertResendPaymentDataButton';
import containerAdminOrderInfoPage from '../container/inversify.adminOrderInfoPage';
import { AppComponent } from '../decorators/AppComponent';
import { AdminOrderInfoPage } from '../events/AdminOrderInfoPage';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [AdminOrderInfoPage], apps:[InsertResendPaymentDataButton]})
export class AdminOrderInfoPageCreateApp extends MainApp implements FacadeInterface {    
    constructor() {
        super();
        this.container = containerAdminOrderInfoPage;
    }
    start(): void {
    }
}
