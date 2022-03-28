
import { injectable } from "inversify";

import { AppInterface } from '../interfaces/AppInterface';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { FacadeInterface } from '../interfaces/MbwayOrderResponseInterface';
import { HttpService } from '../services/HttpService';

declare const $: any;
declare const window: any;

@injectable()
export class MbwayCountdown implements AppInterface {
    private timer2: string;
    private minutesElement: JQuery<HTMLElement>;
    private secondsElement: JQuery<HTMLElement>;
    private httpService: HttpService;
    private appSpinner: JQuery<HTMLElement>;
    private countdownMbway: JQuery<HTMLElement>;
    private countdownPanel: JQuery<HTMLElement>;
    

    constructor(httpService: HttpService) {
        this.timer2 = '4:00';
        this.minutesElement = $('#countdownMinutes');
        this.secondsElement = $('#countdownSeconds');
        this.httpService = httpService;
        this.countdownPanel = $('div.mbwayCountdownPanel');
        this.appSpinner = this.countdownPanel.children('.panel-body').children('.appSpinner');
        this.countdownMbway = $('#countdownMbway');
        
    }

    private checkMBwayPaymentStatus() {
      window.mbwayInterval2 = setInterval(() => {
      this.httpService.setUrl('index.php?route=extension/payment/mbway/cancelMbwayOrder');
      this.httpService.post({'orderId': $('#mbwayOrderId').text()}).then((response: FacadeInterface) => {
        if (response.orderStatus === 'paid') {
          clearInterval(window.mbwayInterval);
          clearInterval(window.mbwayInterval2);
          this.countdownPanel.hide();
          $('#confirmMbwayOrder').show();
        }
        this.appSpinner.hide();
      }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
        this.countdownPanel.hide();
        if (xhr.responseJSON as ErrorInterface) {
            alert(xhr.responseJSON.error);
        } else {
            alert(error);
        }
      });
    }, 10000);
      
  }

    private mbwayOrderCancel(): void {
      this.countdownMbway.hide();
      this.appSpinner.show();
      this.httpService.setUrl('index.php?route=extension/payment/mbway/cancelMbwayOrder');
      this.httpService.post({'orderId': $('#mbwayOrderId').text()}).then((response: FacadeInterface) => {
        $('div.mbwayCountdownPanel').hide();
        if (response.orderStatus === 'pending') {
            $('#confirmMbwayOrder').hide();
        } else {
            $('#confirmMbwayOrder').show();
        }
        this.appSpinner.hide();
      }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
        $('div.mbwayCountdownPanel').hide();
        if (xhr.responseJSON as ErrorInterface) {
            alert(xhr.responseJSON.error);
        } else {
            alert(error);
        }
      });
    }

    init(): void {
      if (this.countdownPanel.is(':visible')) {
        this.checkMBwayPaymentStatus();
        window.mbwayInterval = setInterval(() => {
          const timer = this.timer2.split(':');
          let minutes = parseInt(timer[0], 10);
          let seconds = parseInt(timer[1], 10);
          --seconds;
          minutes = (seconds < 0) ? --minutes : minutes;
          seconds = (seconds < 0) ? 59 : seconds;
          // 0 leftpad needs to be in type string
          let strSeconds = (seconds < 10) ? "0" + seconds : "" + seconds;

          this.minutesElement.text(minutes);
          this.secondsElement.text(strSeconds)
          if (minutes < 0) {
            this.mbwayOrderCancel();
            clearInterval(window.mbwayInterval);
            clearInterval(window.mbwayInterval2);
          } 
          if ((seconds <= 0) && (minutes <= 0)) {
            this.mbwayOrderCancel();
            clearInterval(window.mbwayInterval);
            clearInterval(window.mbwayInterval2);
          } 
          
          this.timer2 = minutes + ':' + strSeconds;
        }, 1000);
      }
    }
}


