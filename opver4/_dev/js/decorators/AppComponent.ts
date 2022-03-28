import { Container } from 'inversify';

export function AppComponent(params: {pageEvents?: Array<any>, apps?: Array<any>}) {
    return function <T extends { new(...args: any[]): { start(): void } }>(target: T) {
        const parentClass = Object.getPrototypeOf(target).prototype;
        parentClass.appEvents = params.pageEvents;
        parentClass.apps = params.apps;
        return class extends target {
            container: Container;
            constructor(...args: any[]) {
                super(...args);
                parentClass.container = this.container;
                parentClass.createAppEvents();
                parentClass.initApps();
            }
        }
    }
}
  

