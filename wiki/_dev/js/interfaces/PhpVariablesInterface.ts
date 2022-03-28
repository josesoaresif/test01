import { PaymentMethodLanguageInterface } from './PaymentMethodLanguageInterface';

export interface PhpVariablesInterface {
    paymentMethod?: string;
    catalogUrl?: string;
    paymentMethodLanguage?: PaymentMethodLanguageInterface;
    resendMbwayNotificationUrl?: string;
    resendPaymentDataUrl?: string;
    ovalSvgUrl: string;
    mbwaySvgUrl: string;
}