<?php

require_once DIR_SYSTEM . 'library/ifthenpay/vendor/autoload.php';

use Ifthenpay\Config\IfthenpayContainer;
use Ifthenpay\Utility\Mix;

$ifthenpayContainer = new IfthenpayContainer();
$mix = $ifthenpayContainer->getIoc()->make(Mix::class);

// Heading
$_['heading_title'] = 'Payshop';
$_['heading_title_payshop'] = 'Payshop Configurações';

// Text
$_['text_extension'] = 'Extensions';
$_['text_payment'] = 'Pagamento';
$_['text_success'] = 'Sucesso: Configuração do módulo Payshop alterada!';
$_['text_payshop'] = '<a onclick="window.open(\'https:www.ifthenpay.com\');"><img src="view/image/payment/ifthenpay/payshop.svg" class="payshopLogo" alt="Payshop Logo" title="Payshop" style="border: 1px solid #EEEEEE; max-width: 30%;" /><br /></a>';
$_['acess_user_documentation'] = 'Aceder ao Manual de Utilizador.';
$_['create_account_now'] = 'Crie uma conta agora!';
$_['text_home'] = 'Home';
$_['text_all_zones'] = 'Todas as regiões';
$_['entry_order_status_canceled'] = 'Estado da Encomenda Cancelado:';

//Entry
$_['entry_backofficeKey'] = 'Chave de acesso ao backoffice';
$_['switch_enable'] = 'Ativar';
$_['switch_disable'] = 'Desativar';
$_['add_new_accounts'] = 'Adicionou novas contas contrato?';
$_['reset_accounts'] = 'Reset Contas';
$_['sandbox_help'] = 'Ative o modo sandbox, para poder testar o módulo sem ativar o callback.';
$_['sandbox_mode'] = 'Modo Sandbox';
$_['dontHaveAccount_payshop'] = 'Não tem conta Payshop?';
$_['requestAccount_payshop'] = 'Solicitar criação de conta Payshop';
$_['newUpdateAvailable'] = 'Nova atualização disponível!';
$_['moduleUpToDate'] = 'O módulo está atualizado!';
$_['downloadUpdateModule'] = 'Download Update Módulo';
$_['acess_user_documentation_link'] = 'https://www.ifthenpay.com/downloads/opencart/opencart_user_guide_pt.pdf';
$_['entry_minimum_value'] = 'Valor Mínimo da Encomenda';
$_['resendPaymentData']	= 'Envie um email com os dados da encomenda e dados de pagamento';


// Entry
$_['activate_callback'] = 'Ativar Callback';
$_['text_enabled'] = 'Ativo';
$_['text_disabled'] = 'Desativado';
$_['entry_order_status'] = 'Estado da Encomenda:';
$_['entry_order_status_complete'] = 'Estado da Encomenda Pago:';
$_['entry_geo_zone'] = 'Geo Zone:';
$_['entry_status'] = 'Estados:';
$_['entry_sort_order'] = 'Ordem do Método de Pagamento:';
$_['entry_payshop_payshopKey'] = 'Payshop Key';
$_['entry_payshop_validade'] = 'Validade';
$_['payshop_validade_helper'] = 'Escolha o número de dias, deixe vazio se não pretender validade.';
$_['choose_entity'] = 'Escolha a Entidade';
$_['entry_antiPhishingKey'] = 'Chave Anti-Phishing';
$_['entry_urlCallback'] = 'Url de Callback';
$_['callbackIsActivated'] = 'Callback ativado';
$_['callbackNotActivated'] = 'Callback não ativado';
$_['show_paymentMethod_logo'] = 'Mostrar o Logotipo do Método de Pagamento no Checkout';
$_['dontHaveAccount_payshop'] = 'Não tem conta Payshop?';
$_['requestAccount_payshop'] = 'Solicitar criação de conta Payshop';
$_['request_new_account_success'] = 'Email a solicitar nova conta enviado com sucesso.';
$_['request_new_account_error'] = 'Erro ao enviar email a solicitar nova conta.';
$_['activate_cancelPayshopOrder'] = 'Cancelar Encomenda Multibanco';
$_['payshopOrderCancel_help'] = 'Cancele a encomenda Multibanco após a referência expirar.';
$_['text_cron_1'] = 'Cron Job\'s são tarefas agendadas e executadas periodicamente. Para configurar o seu servidor, pode ler a <a href="http://docs.opencart.com/extension/cron/" target="_blank" class="alert-link"> documentação do opencart </ a >';
$_['text_cron_2'] = 'Precisa definir o Cron para ser executado a cada minuto.';
$_['text_cron_3'] = 'Quando o callback falhar pode definir um cron job para consultar o estado do pagamento.';
$_['text_cron_2'] = 'Precisa definir o Cron para ser executado todos os dias à 1h:00m.';
$_['entry_cron'] = 'Cron URL';
$_['button_copy'] = 'Copy';
$_['text_instruction'] = 'CRON Instruções';

// Error
$_['error_permission'] = 'Aviso: Não tem permissões para modificar Payshop!';
$_['error_backofficeKey_required'] = 'Chave de acesso ao backoffice é obrigatória!';
$_['error_backofficeKey_error'] = 'Erro a salvar a chave de acesso ao backoffice!';
$_['reset_account_success'] = 'Conta Ifthenpay reinicializada com sucesso!';
$_['reset_account_error'] = 'Erro a reinicializar conta Ifthenpay!';
?>