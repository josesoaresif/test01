import { Container, injectable } from 'inversify';

import { AppInterface } from '../interfaces/AppInterface';
import { EventDefinition } from '../interfaces/EventDefinition';

declare let $: any;

@injectable()
export class MainApp {

    protected apps: Array<AppInterface>;
    protected appEvents: Array<any>;
    protected container: Container;

    protected createAppEvents(): void {
        this.appEvents.forEach(page => {
            const events: Array<EventDefinition> = Reflect.getMetadata('events', page);
            events.forEach((event: EventDefinition) => {
                if (event.dynamic) {
                    $(event.element).on(event.type, event.dynamic, (domEvent: JQuery.TriggeredEvent) => {
                        this.container.get(page)[event.methodName](domEvent);
                    });
                } else {
                    $(event.element)[event.type]((domEvent: JQuery.TriggeredEvent) => {
                        this.container.get(page)[event.methodName](domEvent);
                    });
                }
            });
        });
    }

    protected initApps(): void {
        if (this.apps) {
            this.apps.forEach((app: AppInterface) => {
                const aplication = <AppInterface>this.container.get(<any>app);
                aplication.init();
            });
        }
        
    }
}
