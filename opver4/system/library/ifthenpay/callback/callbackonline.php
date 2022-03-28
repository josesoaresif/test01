<?php

declare(strict_types=1);

namespace Ifthenpay\Callback;

use Ifthenpay\Contracts\Callback\CallbackProcessInterface;
use Ifthenpay\Traits\Payments\ConvertCurrency;

class CallbackOnline extends CallbackProcess implements CallbackProcessInterface
{
    use ConvertCurrency;

    public function process(): void
    {
        $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['paymentMethod'] = $this->paymentMethod;
        $this->setPaymentData();

        if (empty($this->paymentData)) {
            $this->executePaymentNotFound();
        } else {
            try {
                $paymentStatus = $this->status->getTokenStatus(
                    $this->token->decrypt($this->request['qn'])
                );
                $this->setOrder();
                if (strtolower($this->paymentData['status']) !== 'pending' && $this->order['order_status'] !== 
                $this->ifthenpayController->config->get('payment_ccard_order_status_id')) {
                    $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_success'] = '';
                    $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_error'] = $this->ifthenpayController->language->get('orderIsPaid');
                    $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['orderId'] = $this->paymentData['order_id'];
                    $this->ifthenpayController->model_extension_payment_ccard->log([
                        'paymentData' => $this->paymentData,
                        'order' => $this->order,
                    ], 'order already paid');
                    $this->ifthenpayController->response->redirect($this->ifthenpayController->url->link('checkout/success', true));
                } else {
                    
                    if ($paymentStatus === 'success') {
                        $this->ifthenpayController->load->model('setting/setting');
                        $configData =  $this->ifthenpayController->model_setting_setting->getSetting('payment_ccard');
                        if ($this->request['sk'] !== $this->tokenExtra->encript(
                            $this->request['id'] . $this->request['amount'] . $this->request['requestId'], $configData['payment_ccard_ccardKey'])) {
                                throw new \Exception($this->ifthenpayController->language->get('paymentSecurityToken'));
                        }
                        if ($this->order['currency_code'] !== 'EUR') {
                            $orderTotal = $this->ifthenpayController->currency->format($this->order['total'], 'EUR', '', false);
                        } else {
                            $orderTotal = floatval($this->order['total']);
                        }
                        $requestValor = floatval($this->request['amount']);
                        if (round($orderTotal, 2) !== round($requestValor, 2)) {
                            $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_success'] = '';
                            $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_error'] = $this->ifthenpayController->language->get('ccard_error_message');
                            
                        }
                        $this->changeIfthenpayPaymentStatus('paid');
                        $this->ifthenpayController->model_checkout_order->addOrderHistory(
                            $this->paymentData['order_id'], 
                            $this->ifthenpayController->config->get('payment_ccard_order_status_complete_id'),
                            $this->ifthenpayController->language->get('paymentConfirmedSuccess'),
                            true,
                            true
                        );
                        
                        $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_success'] = $this->ifthenpayController->language->get('paymentConfirmedSuccess');
                        $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_error'] = '';
    
                    } else if($paymentStatus === 'cancel') {
                        $this->changeIfthenpayPaymentStatus('cancel');
                        $this->ifthenpayController->model_checkout_order->addOrderHistory(
                            $this->paymentData['order_id'], 
                            $this->ifthenpayController->config->get('payment_ccard_order_status_canceled_id'),
                            $this->ifthenpayController->language->get('ccard_error_canceled'),
                            true,
                            true
                        );

                        $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_success'] = '';
                        $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_error'] = $this->ifthenpayController->language->get('ccard_error_canceled');
                    } else {
                        $this->changeIfthenpayPaymentStatus('error');
                        $this->ifthenpayController->model_checkout_order->addOrderHistory(
                            $this->paymentData['order_id'], 
                            $this->ifthenpayController->config->get('payment_ccard_order_status_failed_id'),
                            $this->ifthenpayController->language->get('ccard_error_failed'),
                            true,
                            true
                        );

                            $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_success'] = '';
                            $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_error'] = $this->ifthenpayController->language->get('ccard_error_failed');
                        
                    }
                        $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['orderId'] = $this->paymentData['order_id'];
                        $this->ifthenpayController->response->redirect($this->ifthenpayController->url->link('checkout/success', true));
                    }
                
            } catch (\Throwable $th) {
                $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['orderView'] = false;
                $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['orderId'] = $this->paymentData['order_id'];
                $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_success'] = '';
                $this->ifthenpayController->session->data['ifthenpayPaymentReturn']['ccard_error'] = $th->getMessage();
                $this->ifthenpayController->response->redirect($this->ifthenpayController->url->link('checkout/success', true));
            }
        }
    }
}
