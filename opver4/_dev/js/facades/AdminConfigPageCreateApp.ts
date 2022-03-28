import { injectable} from 'inversify';

import { Callback } from '../classes/Callback';
import containerAdminConfigPage from '../container/inversify.adminConfigPage';
import { AppComponent } from '../decorators/AppComponent';
import { AdminConfigPage } from '../events/AdminConfigPage';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [AdminConfigPage], apps:[Callback]})
export class AdminConfigPageCreateApp extends MainApp implements FacadeInterface {    
    constructor() {
        super();
        this.container = containerAdminConfigPage;
    }
    start(): void {
    }
}
