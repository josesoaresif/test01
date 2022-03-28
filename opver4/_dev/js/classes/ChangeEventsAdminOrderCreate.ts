import { injectable } from "inversify";

import { AppInterface } from '../interfaces/AppInterface';

declare const $: any;

@injectable()
export class ChangeEventsAdminOrderCreate implements AppInterface {
    
    init(): void {
        $._data( $('#button-save')[0], "events" ).click.splice(0, 0, $._data( $('#button-save')[0], "events" ).click.splice(1, 1)[0]);
    }
}
