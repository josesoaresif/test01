export interface PaymentMethodLanguageInterface {
    required: string,
    invalid: string,
    mbwayPhoneNumber?: string,
    adminResendMbwayNotification?: string,
    resendPaymentData?: string
}