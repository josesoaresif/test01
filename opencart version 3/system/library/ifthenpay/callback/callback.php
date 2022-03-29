<?php

declare(strict_types=1);

namespace Ifthenpay\Callback;

use Ifthenpay\Request\WebService;
use Ifthenpay\Builders\GatewayDataBuilder;
use Ifthenpay\Payments\Gateway;

class Callback
{

    private $activateEndpoint = 'https://ifthenpay.com/api/endpoint/callback/activation';
    private $webService;
    private $urlCallback;
    private $chaveAntiPhishing;
    private $backofficeKey;
    private $entidade;
    private $subEntidade;
    private $activatedFor = false;

    private $urlCallbackParameters = [
        Gateway::MULTIBANCO => '&type=offline&payment={paymentMethod}&chave=[CHAVE_ANTI_PHISHING]&entidade=[ENTIDADE]&referencia=[REFERENCIA]&valor=[VALOR]',
        Gateway::MBWAY => '&type=offline&payment={paymentMethod}&chave=[CHAVE_ANTI_PHISHING]&referencia=[REFERENCIA]&id_pedido=[ID_TRANSACAO]&valor=[VALOR]&estado=[ESTADO]',
        Gateway::PAYSHOP => '&type=offline&payment={paymentMethod}&chave=[CHAVE_ANTI_PHISHING]&id_cliente=[ID_CLIENTE]&id_transacao=[ID_TRANSACAO]&referencia=[REFERENCIA]&valor=[VALOR]&estado=[ESTADO]',
        Gateway::CCARD => '?type=offline&payment={paymentMethod}&chave=[CHAVE_ANTI_PHISHING]&requestId=[REQUEST_ID]&orderId=[ORDER_ID]&valor=[VALOR]'
    ];

    public function __construct(GatewayDataBuilder $data, WebService $webService)
    {
        $this->webService = $webService;
        $this->backofficeKey = $data->getData()->backofficeKey;
        $this->entidade = $data->getData()->entidade;
        $this->subEntidade = $data->getData()->subEntidade;
    }

    private function createAntiPhishing(): void
    {
        $this->chaveAntiPhishing = md5((string) rand());
    }

    private function createUrlCallback(string $paymentType, string $moduleLink): void
    {
        $this->urlCallback = $moduleLink . str_replace('{paymentMethod}', $paymentType, $this->urlCallbackParameters[$paymentType]);
    }

    private function activateCallback(): void
    {
        $request = $this->webService->postRequest(
            $this->activateEndpoint,
            [
            'chave' => $this->backofficeKey,
            'entidade' => $this->entidade,
            'subentidade' => $this->subEntidade,
            'apKey' => $this->chaveAntiPhishing,
            'urlCb' => $this->urlCallback,
            ],
            true
        );

        $response = $request->getResponse();
        if (!$response->getStatusCode() === 200 && !$response->getReasonPhrase()) {
            throw new \Exception("Error Activating Callback");
        }
        $this->activatedFor = true;
    }

    public function make(string $paymentType, string $moduleLink, bool $activateCallback = false): void
    {
        $this->createAntiPhishing();
        $this->createUrlCallback($paymentType, $moduleLink);
        if ($activateCallback) {
            $this->activateCallback();
        }
    }

    /**
     * Get the value of urlCallback
     */
    public function getUrlCallback(): string
    {
        return $this->urlCallback;
    }

    /**
     * Get the value of chaveAntiPhishing
     */
    public function getChaveAntiPhishing(): string
    {
        return $this->chaveAntiPhishing;
    }

    /**
     * Get the value of activatedFor
     */ 
    public function getActivatedFor()
    {
        return $this->activatedFor;
    }
}
