const sappApiUrl = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';
let menuOptions = [];
entityLoader('Menu Texts', menuTexts => {
  rp({uri: `${sappApiUrl}/zendesk/loan-details?dni=${context.userData.variables.dni}&accessToken=ELTOKENDEFEDE`, json: true})
    .then(loanDetails => {
        rp({uri: `${sappApiUrl}/botmaker/loans/${context.userData.variables.dni}/status?accessToken=ELTOKENDEFEDE`, json: true})
          .then(loanStatus => {
          const productId = loanStatus.idProduct;
          let ruleName = null;
          var nameclient = `Hola ${loanDetails.customerFirstName} ${loanDetails.customerLastName}`;
          
          if (loanStatus.judicialStudyAssigned) {            
            user.set('COBenestudio', 'true');
            user.set('menuText', loanStatus.judicialStudyMessage);
            ruleName = 'V3_Cobranzas_Judicial_Menu';
            menuOptions.push({
              id: 'operador',
              name: 'Si',
              onSelected: 'Hablar con operador'
            });
            menuOptions.push({
              id: 'fin-conversacion',
              name: 'No',
              onSelected: 'Finalizar conversación'
            });
          } else { 
            user.set('COBenmora', 'true'); 
            user.set('menuText', `${nameclient}, te puedo ayudar con los siguientes temas:`/*loanStatus.debtAmountMessage*/);
            user.set('customerLoanId', loanStatus.loanId);
        
              menuOptions.push({
                  id: 'estado-cuenta',
                  name: menuTexts.find(text => text.id === 'estado-cuenta').text, //'Ver mi estado de cuenta', //
                  onSelected: 'V3_verEstadoCuenta',
                  afterOnSelected: 'V2_FAQ_Fin'
              });
              menuOptions.push({
                  id: 'pagar-cuota',
                  name: menuTexts.find(text => text.id === 'pagar-cuota').text, //'Pagar mi cuota'//, 
                  onSelected: 'PagarMiCuota',
                  afterOnSelected: 'V2_FAQ_Fin'
              });
              menuOptions.push({
                  id: 'comprobante-pago',
                  name: menuTexts.find(text => text.id === 'comprobante-pago').text, //'Mandar un comprobante de pago'//, 
                  onSelected: 'MandarComprobantePago',
                  afterOnSelected: 'V2_FAQ_Fin'
              });
              menuOptions.push({
                  id: 'pedir-libre-deuda',
                  name: menuTexts.find(text => text.id === 'pedir-libre-deuda').text, //'Pedir mi Libre Deuda'//, 
                  onSelected: 'PedirLibreDeuda',
                  afterOnSelected: 'V2_FAQ_Fin'
              });
              menuOptions.push({
                  id: 'saldo-anticipada',
                  name: menuTexts.find(text => text.id === 'saldo-anticipada').text, //'Pedir saldo cancelacion anticipada'//, 
                  onSelected: 'PedirCancelacionAnticipada',
                  afterOnSelected: 'V2_FAQ_Fin'
              });
              menuOptions.push({
                  id: 'por-prestamo',
                  name: menuTexts.find(text => text.id === 'por-prestamo').text, //'Consultar por otro prestamo'//, 
                  onSelected: 'ConsultarOtroPrestamo',
                  afterOnSelected: 'V2_FAQ_Fin'
              });
              menuOptions.push({
                  id: 'hacer-reclamo',
                  name: menuTexts.find(text => text.id === 'hacer-reclamo').text, //'Hacer un reclamo'//, 
                  onSelected: 'HacerUnReclamo',
                  afterOnSelected: 'V2_FAQ_Fin'
              });
            ruleName = 'V3_Cobranzas_Menu';
          }
          user.set('menuOptions', JSON.stringify(menuOptions));
          result.gotoRule(ruleName);
          result.done();
        }).catch(err => {
          bmconsole.log(err.message);
          bmconsole.log(err.stack);
          result.gotoRule('V3_Cobranzas_Fin');
          result.done();
        });
  	}).catch(err => {
      bmconsole.log(err.message);
      bmconsole.log(err.stack);
      result.gotoRule('V3_Cobranzas_Fin');
      result.done();
    });
  });