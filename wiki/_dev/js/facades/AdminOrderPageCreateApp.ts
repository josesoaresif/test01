import { injectable} from 'inversify';

import { RemoveBr } from '../classes/RemoveBr';
import containerAdminOrderPage from '../container/inversify.adminOrderPage';
import { AppComponent } from '../decorators/AppComponent';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [], apps:[RemoveBr]})
export class AdminOrderPageCreateApp extends MainApp implements FacadeInterface {    
    constructor() {
        super();
        this.container = containerAdminOrderPage;
    }
    start(): void {
    }
}
