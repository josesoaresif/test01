<?php

declare(strict_types=1);

namespace Ifthenpay\Forms;

use Ifthenpay\Payments\Gateway;
use Ifthenpay\Callback\Callback;
use Illuminate\Container\Container;
use Ifthenpay\Builders\GatewayDataBuilder;
use Ifthenpay\Config\IfthenpayUpgrade;
use Ifthenpay\Utility\Mix;

abstract class ConfigForm
{
    protected $paymentMethod;
    protected $form;
    protected $ifthenpayController;
    protected $gatewayDataBuilder;
    protected $ifthenpayGateway;
    private $dynamicModelName;
    protected $options;
    protected $formFactory;
    protected $configData;
    protected $data;
    protected $ioc;
    protected $hasCallback = true;
    protected $mix;

    public function __construct(Container $ioc, GatewayDataBuilder $gatewayDataBuilder, Gateway $gateway, Mix $mix)
    {
        $this->ioc = $ioc;
        $this->gatewayDataBuilder = $gatewayDataBuilder;
        $this->ifthenpayGateway = $gateway;
        $this->options = [];
        $this->data = [];
        $this->dynamicModelName = 'model_extension_payment_' . $this->paymentMethod;
        $this->mix = $mix;
    }

    protected function setHasCallback(): void
    {
        $this->data['hasCallback'] = $this->hasCallback;
    }

    protected function checkIfCallbackIsSet(): bool
    {
        if (
            !$this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_urlCallback')
            && !$this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_chaveAntiPhishing')
        ) {
            return false;
        }
        return true;
    }

    protected function addToOptions(): void
    {
        $this->ifthenpayGateway->setAccount((array) unserialize($this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_userAccount')));
        $this->options[] = [
            'value' => $this->ifthenpayController->language->get('choose_entity')
        ];
        foreach ($this->ifthenpayGateway->getEntidadeSubEntidade($this->paymentMethod) as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $key2 => $value2) {
                    if (strlen($value2) > 3) {
                        $this->options[] = [
                            'value' => $value2,
                        ];
                    }
                }
            } else {
                $this->options[] = [
                    'value' => $value,
                ];
            }
        }
    }

    protected function setDefaultGatewayBuilderData(): void
    {
        $this->data[$this->paymentMethod . 'Svg'] = 'view/image/payment/ifthenpay/' . $this->paymentMethod . '.svg';
        $this->data['entry_backofficeKey'] = $this->ifthenpayController->language->get('entry_backofficeKey');
        $this->data['header'] = $this->ifthenpayController->load->controller('common/header');
        $this->data['column_left'] = $this->ifthenpayController->load->controller('common/column_left');
        $this->data['footer'] = $this->ifthenpayController->load->controller('common/footer');
        $this->data['text_enabled'] = $this->ifthenpayController->language->get('text_enabled');
        $this->data['heading_title'] = $this->ifthenpayController->language->get('heading_title');
        $this->data['paymentMethod'] = $this->paymentMethod;
        $this->data['text_all_zones'] = $this->ifthenpayController->language->get('text_all_zones');
        $this->data['text_success'] = (isset($this->ifthenpayController->session->data['success']) ? $this->ifthenpayController->session->data['success'] : '');
        $this->data['create_account_now'] = $this->ifthenpayController->language->get('create_account_now');
        $this->data['button_save'] = $this->ifthenpayController->language->get('button_save');
        $this->data['button_cancel'] = $this->ifthenpayController->language->get('button_cancel');
        $this->data['tab_general'] = $this->ifthenpayController->language->get('tab_general');
        //user token
        $this->data['user_token'] = $this->ifthenpayController->session->data['user_token'];
        $this->data['breadcrumbs'] = array();

        $this->data['breadcrumbs'][] = array(
            'text' => $this->ifthenpayController->language->get('text_home'),
            'href' => $this->ifthenpayController->url->link(
                'common/dashboard',
                'user_token=' .
                    $this->ifthenpayController->session->data['user_token'],
                true
            )
        );

        $this->data['breadcrumbs'][] = array(
            'text' => $this->ifthenpayController->language->get('text_extension'),
            'href' => $this->ifthenpayController->url->link(
                'marketplace/extension',
                'user_token=' . $this->ifthenpayController->session->data['user_token'] .
                    '&type=payment',
                true
            )
        );

        $this->data['breadcrumbs'][] = array(
            'text' => $this->ifthenpayController->language->get('heading_title'),
            'href' => $this->ifthenpayController->url->link(
                'extension/payment/' . $this->paymentMethod,
                'user_token=' .
                    $this->ifthenpayController->session->data['user_token'],
                true
            )
        );

        $this->data['resetIfthnepayAccountsUrl'] = $this->ifthenpayController->url->link(
            'extension/payment/' . $this->paymentMethod . '/resetUserAccounts',
            'user_token=' . $this->ifthenpayController->session->data['user_token'],
            true
        );
        $this->data['action'] = $this->ifthenpayController->url->link(
            'extension/payment/' . $this->paymentMethod,
            'user_token=' .
                $this->ifthenpayController->session->data['user_token'],
            true
        );
        $this->data['cancel'] = $this->ifthenpayController->url->link(
            'marketplace/extension',
            'user_token=' .
                $this->ifthenpayController->session->data['user_token'] . '&type=payment',
            true
        );

        if (isset($this->ifthenpayController->error['warning']) && $this->ifthenpayController->error !== '') {
            $this->data['error_warning'] = $this->ifthenpayController->error['warning'];
        } else {
            $this->data['error_warning'] = '';
        }
        if (isset($this->ifthenpayController->session->data['success'])) {
            $this->data['success'] = $this->ifthenpayController->session->data['success'];
            unset($this->ifthenpayController->session->data['success']);
        } else {
            $this->data['success'] = '';
        }

        if (isset($this->ifthenpayController->error['warning'])) {
            $this->data['error_warning'] = $this->ifthenpayController->error['warning'];
        } else {
            $this->data['error_warning'] = '';
        }
    }

    protected function setGatewayBuilderData(): void
    {
        $this->setDefaultGatewayBuilderData();

        $this->data['add_new_accounts'] = $this->ifthenpayController->language->get('add_new_accounts');
        $this->data['reset_accounts'] = $this->ifthenpayController->language->get('reset_accounts');
        $this->data['sandbox_help'] = $this->ifthenpayController->language->get('sandbox_help');
        $this->data['sandbox_mode'] = $this->ifthenpayController->language->get('sandbox_mode');
        $this->data['entry_status'] = $this->ifthenpayController->language->get('entry_status');
        $this->data['add_new_accounts'] = $this->ifthenpayController->language->get('add_new_accounts');
        $this->data['reset_accounts'] = $this->ifthenpayController->language->get('reset_accounts');
        $this->data['show_paymentMethod_logo'] = $this->ifthenpayController->language->get('show_paymentMethod_logo');
        $this->data['entry_order_status'] = $this->ifthenpayController->language->get('entry_order_status');
        $this->data['entry_order_status_complete'] = $this->ifthenpayController->language->get('entry_order_status_complete');
        $this->data['entry_geo_zone'] = $this->ifthenpayController->language->get('entry_geo_zone');
        $this->data['dontHaveAccount_' . $this->paymentMethod] = $this->ifthenpayController->language->get('dontHaveAccount_' . $this->paymentMethod);
        $this->data['requestAccount_' . $this->paymentMethod] = $this->ifthenpayController->language->get('requestAccount_' . $this->paymentMethod);

        $this->data['text_' . $this->paymentMethod] = $this->ifthenpayController->language->get('text_' . $this->paymentMethod) .
            '<img src="view/image/payment/ifthenpay/' . $this->paymentMethod . '.svg' . '" class="' . $this->paymentMethod .
            ' Logo" alt="' . $this->paymentMethod  . 'Logo" title="' . $this->paymentMethod . '" /><br /></a>';

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_backofficeKey'])) {
            $this->data['payment_' . $this->paymentMethod . '_backofficeKey'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_backofficeKey'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_backofficeKey'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_backofficeKey');
        }

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_sandboxMode'])) {
            $this->data['payment_' . $this->paymentMethod . '_sandboxMode'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_sandboxMode'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_sandboxMode'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_sandboxMode');
        }

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_status'])) {
            $this->data['payment_' . $this->paymentMethod . '_status'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_status'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_status'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_status');
        }

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_activateCallback'])) {
            $this->data['payment_' . $this->paymentMethod . '_activateCallback'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_activateCallback'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_activateCallback'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_activateCallback');
        }

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_order_status_canceled_id'])) {
            $this->data['payment_' . $this->paymentMethod . '_order_status_canceled_id'] = $this->ifthenpayController->request
                ->post['payment_' . $this->paymentMethod . '_order_status_canceled_id'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_order_status_canceled_id'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_order_status_canceled_id');
        }

        $this->ifthenpayController->load->model('localisation/order_status');

        $this->data['order_statuses'] = $this->ifthenpayController->model_localisation_order_status->getOrderStatuses();

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_activate_cancelMbwayOrder'])) {
            $this->data['payment_' . $this->paymentMethod . '_activate_cancel' . ucfirst($this->paymentMethod) . 'Order'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_activate_cancel' . ucfirst($this->paymentMethod) . 'Order'];
        } else if (isset($this->configData['payment_' . $this->paymentMethod . '_activate_cancel' . ucfirst($this->paymentMethod) . 'Order'])) {
            $this->data['payment_' . $this->paymentMethod . '_activate_cancel' . ucfirst($this->paymentMethod) . 'Order'] = $this
                ->configData['payment_' . $this->paymentMethod . '_activate_cancel' . ucfirst($this->paymentMethod) . 'Order'];
        }

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_order_status_id'])) {
            $this->data['payment_' . $this->paymentMethod . '_order_status_id'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_order_status_id'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_order_status_id'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_order_status_id');
        }

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_order_status_complete_id'])) {
            $this->data['payment_' . $this->paymentMethod . '_order_status_complete_id'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_order_status_complete_id'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_order_status_complete_id'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_order_status_complete_id');
        }

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_showPaymentMethodLogo'])) {
            $this->data['payment_' . $this->paymentMethod . '_showPaymentMethodLogo'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_showPaymentMethodLogo'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_showPaymentMethodLogo'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_showPaymentMethodLogo');
        }

        $this->data['order_statuses'] = $this->ifthenpayController->model_localisation_order_status->getOrderStatuses();

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_geo_zone_id'])) {
            $this->data['payment_' . $this->paymentMethod . '_geo_zone_id'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_geo_zone_id'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_geo_zone_id'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_geo_zone_id');
        }

        $this->ifthenpayController->load->model('localisation/geo_zone');

        $this->data['geo_zones'] = $this->ifthenpayController->model_localisation_geo_zone->getGeoZones();

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_minimum_value'])) {
            $this->data['payment_' . $this->paymentMethod . '_minimum_value'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_minimum_value'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_minimum_value'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_minimum_value');
        }

        if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_sort_order'])) {
            $this->data['payment_' . $this->paymentMethod . '_sort_order'] = $this->ifthenpayController
                ->request->post['payment_' . $this->paymentMethod . '_sort_order'];
        } else {
            $this->data['payment_' . $this->paymentMethod . '_sort_order'] = $this->ifthenpayController
                ->config->get('payment_' . $this->paymentMethod . '_sort_order');
        }

        if ($this->hasCallback) {
            if (isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_activateCallback'])) {
                $this->data['payment_' . $this->paymentMethod . '_activateCallback'] = $this->ifthenpayController->request
                    ->post['payment_' . $this->paymentMethod . '_activateCallback'];
            } else {
                $this->data['payment_' . $this->paymentMethod . '_activateCallback'] = $this->ifthenpayController->config
                    ->get('payment_' . $this->paymentMethod . '_activateCallback');
            }
        }

        $this->data['actionRequestAccount'] = $this->ifthenpayController->url->link(
            'extension/payment/' . $this->paymentMethod .
                '/requestNewAccount',
            'user_token=' . $this->ifthenpayController->session->data['user_token'],
            true
        );
        if ($this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_userPaymentMethods')) {
            $ifthenpayUserPaymentMethods = unserialize($this->ifthenpayController->config->get('payment_' . $this->paymentMethod .
                '_userPaymentMethods'));

            if (
                !is_null($ifthenpayUserPaymentMethods) && is_array($ifthenpayUserPaymentMethods) && !in_array(
                    $this->paymentMethod,
                    $ifthenpayUserPaymentMethods
                )
            ) {
                $this->data['ifthenpayPayments'] = true;
            }
        }


        $this->data['actionRequestAccount'] = $this->ifthenpayController->url->link(
            'extension/payment/' . $this->paymentMethod .
                '/requestNewAccount',
            'user_token=' . $this->ifthenpayController->session->data['user_token'],
            true
        );
        if ($this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_userPaymentMethods')) {
            $ifthenpayUserPaymentMethods = unserialize($this->ifthenpayController->config->get('payment_' . $this->paymentMethod .
                '_userPaymentMethods'));

            if (
                !is_null($ifthenpayUserPaymentMethods) && is_array($ifthenpayUserPaymentMethods) && !in_array(
                    $this->paymentMethod,
                    $ifthenpayUserPaymentMethods
                )
            ) {
                $this->data['ifthenpayPayments'] = true;
            }
        }


        $needUpgrade = $this->ioc->make(IfthenpayUpgrade::class)->checkModuleUpgrade();
        $this->data['updateIfthenpayModuleAvailable'] = $needUpgrade['upgrade'];
        $this->data['upgradeModuleBulletPoints'] = $needUpgrade['upgrade'] ? $needUpgrade['body'] : '';
        $this->data['moduleUpgradeUrlDownload'] = $needUpgrade['upgrade'] ? $needUpgrade['download'] : '';
        $this->saveCronToken('cancelOrderCron', 'cron');
        $this->saveCronToken('checkPaymentStatusCron', 'cron_check_payment_status');
        $this->data['spinner'] = $this->ifthenpayController->load->view('extension/payment/spinner', $this->data);
        $this->data['ifthenpay_updateModule'] = $this->ifthenpayController->load->view('extension/payment/ifthenpay_update_module', $this->data);
        $backofficeKey = is_null($this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_backofficeKey')) ?
            $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_backofficeKey'] :
            $this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_backofficeKey');
        $this->gatewayDataBuilder->setBackofficeKey($backofficeKey);
    }

    protected function getCallbackControllerUrl(): string
    {
        return ($this->ifthenpayController->config->get('config_secure') ? rtrim(HTTP_CATALOG, '/') : rtrim(HTTPS_CATALOG, '/')) .
            '/index.php?route=extension/payment/' . $this->paymentMethod . '/callback';
    }

    protected function setIfthenpayCallback(): void
    {
        if ($this->checkIfEntidadeSubEntidadeIsSet()) {
            $this->data['displayCallbackTableInfo'] = $this->checkIfCallbackIsSet() ? true : false;
            if ($this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_callback_activated')) {
                $this->data['isCallbackActivated'] = true;
            } else {
                $this->data['isCallbackActivated'] = false;
            }

            $paymentIfthenpaySandbox = $this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_sandboxMode');

            if (is_null($this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_activateCallback'))) {
                $paymentIfthenpayActivateCallback = $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_activateCallback'];
            } else {
                $paymentIfthenpayActivateCallback = $this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_activateCallback');
            }

            if (!is_null($this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_activateCallback')) && isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_activateCallback']) && $this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_activateCallback') !== $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_activateCallback']) {
                $paymentIfthenpayActivateCallback = $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_activateCallback'];
            }

            if (!is_null($this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_sandboxMode')) && isset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_sandboxMode']) && $this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_sandboxMode') !== $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_sandboxMode']) {
                $paymentIfthenpaySandbox = $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_sandboxMode'];
            }

            $activateCallback = !$paymentIfthenpaySandbox && $paymentIfthenpayActivateCallback && !$this->data['isCallbackActivated'] ? true : false;

            $ifthenpayCallback = $this->ioc->makeWith(Callback::class, ['data' => $this->gatewayDataBuilder]);
            $ifthenpayCallback->make($this->paymentMethod, $this->getCallbackControllerUrl(), $activateCallback);
            $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_callback_activated'] = $ifthenpayCallback->getActivatedFor();
            $this->data['payment_' . $this->paymentMethod . '_callback_activated_for'] = $ifthenpayCallback->getActivatedFor();
            if ($activateCallback) {
                $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_urlCallback'] = $ifthenpayCallback->getUrlCallback();
                $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_chaveAntiPhishing'] = $ifthenpayCallback->getChaveAntiPhishing();
                $this->data['payment_' . $this->paymentMethod . '_urlCallback'] = $ifthenpayCallback->getUrlCallback();
                $this->data['payment_' . $this->paymentMethod . '_chaveAntiPhishing'] = $ifthenpayCallback->getChaveAntiPhishing();
            } else if (!$this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_urlCallback') && !$this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_chaveAntiPhishing')) {
                $this->data['payment_' . $this->paymentMethod . '_urlCallback'] = $ifthenpayCallback->getUrlCallback();
                $this->data['payment_' . $this->paymentMethod . '_chaveAntiPhishing'] = $ifthenpayCallback->getChaveAntiPhishing();
                $this->data['displayCallbackTableInfo'] = true;
                $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_urlCallback'] = $this->data['payment_' . $this->paymentMethod . '_urlCallback'];
                $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_chaveAntiPhishing'] = $this->data['payment_' . $this->paymentMethod . '_chaveAntiPhishing'];
            } else {
                $this->data['payment_' . $this->paymentMethod . '_urlCallback'] = $this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_urlCallback');
                $this->data['payment_' . $this->paymentMethod . '_chaveAntiPhishing'] = $this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_chaveAntiPhishing');
                $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_urlCallback'] = $this->data['payment_' . $this->paymentMethod . '_urlCallback'];
                $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_chaveAntiPhishing'] = $this->data['payment_' . $this->paymentMethod . '_chaveAntiPhishing'];
            }
        }
    }

    protected function validate()
    {

        if (!$this->ifthenpayController->user->hasPermission('modify', 'extension/payment/' . $this->paymentMethod)) {
            $this->ifthenpayController->error['warning'] = $this->ifthenpayController->language->get('error_permission');
        }

        if (!$this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_backofficeKey')) {
            $backofficeKey = $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_backofficeKey'];
            if (!$backofficeKey) {
                $this->ifthenpayController->error['warning'] = $this->ifthenpayController->language->get('error_backofficeKey_required');
            } else {
                try {
                    if (
                        !$this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_userPaymentMethods') &&
                        !$this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_userAccount')
                    ) {
                        $ifthenpayGateway = $this->ioc->make(Gateway::class);
                        $ifthenpayGateway->authenticate($backofficeKey);
                        $userPaymentMethods = $ifthenpayGateway->getPaymentMethods();
                        $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_userPaymentMethods'] = serialize(
                            $userPaymentMethods
                        );
                        $this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_userAccount'] = serialize(
                            $ifthenpayGateway->getAccount()
                        );
                        if (in_array($this->paymentMethod, $userPaymentMethods)) {
                            $this->ifthenpayController->{$this->dynamicModelName}->install($this->paymentMethod);
                        }
                    }
                    $this->ifthenpayController->{$this->dynamicModelName}->log('', 'Backoffice key saved with success');
                } catch (\Throwable $th) {
                    $this->ifthenpayController->load->model('extension/payment/' . $this->paymentMethod);
                    $this->ifthenpayController->{$this->dynamicModelName}->uninstall($this->ifthenpayContainer, $this->paymentMethod);
                    $this->ifthenpayController->model_setting_setting->deleteSetting('payment_' . $this->paymentMethod);
                    unset($this->ifthenpayController->request->post['payment_' . $this->paymentMethod . '_backofficeKey']);
                    $this->ifthenpayController->error['warning'] = $this->ifthenpayController
                        ->language->get('error_backofficeKey_error');
                    $this->ifthenpayController->{$this->dynamicModelName}->log($th->getMessage(), 'Error saving backoffice key');
                    return !$this->ifthenpayController->error;
                }
            }
        }
        return !$this->ifthenpayController->error;
    }

    protected function saveCronToken(string $cronMethod, string $cronKeyData)
    {
        if (!$this->ifthenpayController->config->get('payment_' . $this->paymentMethod . '_cronToken_' . $cronMethod)) {
            $cronToken = md5((string) rand());
            $this->configData['payment_' . $this->paymentMethod . '_cronToken_' . $cronMethod] = $cronToken;
            $this->ifthenpayController->model_setting_setting->editSetting('payment_' . $this->paymentMethod, $this->configData);
        } else {
            $cronToken = $this->configData['payment_' . $this->paymentMethod . '_cronToken_' . $cronMethod];
        }
        $this->data[$cronKeyData] = ($this->ifthenpayController->config->get('config_secure') ? rtrim(HTTP_CATALOG, '/') : rtrim(HTTPS_CATALOG, '/')) .
            '/index.php?route=extension/payment/' . $this->paymentMethod . '/' . $cronMethod . '&tk=' . $cronToken;
    }

    public function processForm(): void
    {
        if ($this->validate()) {
            if (!empty($this->configData)) {
                $this->ifthenpayController->request->post = array_merge(
                    $this->configData,
                    $this->ifthenpayController->request->post
                );
            }
            $this->ifthenpayController->model_setting_setting->editSetting(
                'payment_' . $this->paymentMethod,
                $this->ifthenpayController->request->post
            );
            $this->setGatewayBuilderData();
            $this->setIfthenpayCallback();
            $this->ifthenpayController->model_setting_setting->editSetting(
                'payment_' . $this->paymentMethod,
                $this->ifthenpayController->request->post
            );
            $this->ifthenpayController->session->data['success'] = $this->ifthenpayController->language->get('text_success');
            $this->ifthenpayController->response->redirect(
                $this->ifthenpayController->url->link(
                    'extension/payment/' . $this->paymentMethod,
                    'user_token=' .
                        $this->ifthenpayController->session->data['user_token'],
                    true
                )
            );
            $this->ifthenpayController->{$this->dynamicModelName}->log('', 'Payment Configuration saved with success.');
            $this->setHasCallback();
        }
    }

    //abstract protected function setOptions(): void;
    abstract public function getForm(): array;
    //abstract public function processForm(): void;
    abstract public function deleteConfigValues(): void;
    abstract protected function checkIfEntidadeSubEntidadeIsSet(): bool;

    /**
     * Set the value of paymentMethod
     *
     * @return  self
     */
    public function setPaymentMethod($paymentMethod)
    {
        $this->paymentMethod = $paymentMethod;

        return $this;
    }

    /**
     * Set the value of ifthenpayController
     *
     * @return  self
     */
    public function setIfthenpayController($ifthenpayController)
    {
        $this->ifthenpayController = $ifthenpayController;

        return $this;
    }

    /**
     * Set the value of configData
     *
     * @return  self
     */
    public function setConfigData($configData)
    {
        $this->configData = $configData;

        return $this;
    }
}
