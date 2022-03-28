import { injectable } from "inversify";

import { PhpVariablesInterface } from '../interfaces/PhpVariablesInterface';

declare let $: any;
declare const phpVariables: PhpVariablesInterface;

@injectable()
export class MbwayService {
    private readonly MBWAY_PHONE_REGEX = /^((91|96|92|93)[0-9]{7})$/g;
    public readonly mbwayPhoneVal: string;

    constructor() {
        this.mbwayPhoneVal = $('#ifthenpayMbwayPhone').val();

    }

    private getErrorMessage(errorMessage: string): string {
        return `<div id="ifthenpayErrorMessage" class="alert alert-error">${errorMessage}</div>`;
    }

    getMbwayIcon(): string {
        return `<img src="${phpVariables.catalogUrl}${phpVariables.mbwaySvgUrl}" class="icon" alt="mbway logo">`;
    }

    getMbwayInput(): string {
        return `<div class="field required" id="ifthenpayMbwayPhoneDiv" style="width:230px!important">
            <div class="control input-container">
              ${this.getMbwayIcon()}
              <input name="mbwayInputPhone" class="text input-field" type="number" id="ifthenpayMbwayPhone" placeholder="${phpVariables.paymentMethodLanguage.mbwayPhoneNumber}">
            </div>
          </div>`
    }

    validateMbwayInputPhone(): boolean {
        const ifthenpayMbwayPhoneDiv = $('#ifthenpayMbwayPhoneDiv');
        $('#ifthenpayErrorMessage').remove();
        if (ifthenpayMbwayPhoneDiv.length > 0) {
            if (!this.mbwayPhoneVal) {
                $(this.getErrorMessage(phpVariables.paymentMethodLanguage.required)).insertBefore(ifthenpayMbwayPhoneDiv);
                return false;
            }else if (!this.MBWAY_PHONE_REGEX.test(this.mbwayPhoneVal)){
                $(this.getErrorMessage(phpVariables.paymentMethodLanguage.invalid)).insertBefore(ifthenpayMbwayPhoneDiv);
                return false;
            } else {
                return true;
            }
        }
    }
}


