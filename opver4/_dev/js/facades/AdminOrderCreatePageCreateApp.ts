import { injectable} from 'inversify';

import { ChangeEventsAdminOrderCreate } from '../classes/ChangeEventsAdminOrderCreate';
import { CheckRadioButton } from '../classes/CheckRadioButton';
import containerAdminOrderCreatePage from '../container/inversify.adminOrderCreatePage';
import { AppComponent } from '../decorators/AppComponent';
import { AdminOrderCreatePage } from '../events/AdminOrderCreatePage';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [AdminOrderCreatePage], apps:[ChangeEventsAdminOrderCreate, CheckRadioButton]})
export class AdminOrderCreatePageCreateApp extends MainApp implements FacadeInterface {    
    constructor() {
        super();
        this.container = containerAdminOrderCreatePage;
    }
    start(): void {
    }
}
