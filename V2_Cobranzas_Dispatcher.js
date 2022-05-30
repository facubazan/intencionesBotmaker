const sappApiUrl = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';
let menuOptions = [];
entityLoader('Menu Texts', menuTexts => {
  rp({uri: `${sappApiUrl}/zendesk/loan-details?dni=${context.userData.variables.dni}&accessToken=ELTOKENDEFEDE`, json: true})
    .then(loanDetails => {
        rp({uri: `${sappApiUrl}/botmaker/loans/${context.userData.variables.dni}/status?accessToken=ELTOKENDEFEDE`, json: true})
          .then(loanStatus => {
          const productId = loanStatus.idProduct;
          let ruleName = null;
          if (loanStatus.judicialStudyAssigned) {            
            user.set('COBenestudio', 'true');
            user.set('menuText', loanStatus.judicialStudyMessage);
            ruleName = 'V2_Cobranzas_Judicial_Menu';
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
            user.set('menuText', loanStatus.debtAmountMessage);
            user.set('customerLoanId', loanStatus.loanId);
            if (productId !== 19) {
              menuOptions.push({
                id: 'pago-debito',
                name: menuTexts.find(text => text.id === 'pago-debito').text, // 'Quiero pagar con mi tarjeta de débito',
                onSelected: 'V2_Formulario_Tarjeta_Debito',
                afterOnSelected: 'V2_CAC_Fin'
              });            
              menuOptions.push({
                id: 'codigo-pago',
                name: menuTexts.find(text => text.id === 'codigo-pago').text, //'Quiero mi código para PagoMisCuentas', 
                onSelected: 'V2_Enviar_Codigo_De_Pago',
                afterOnSelected: 'V2_Cobranzas_Fin'
              });
            } 
			menuOptions.push({
               id: 'cancelacion-anticipada',
               name: menuTexts.find(text => text.id === 'cancelacion-anticipada').text, //'Quiero solicitar cancelación anticipada de préstamo', 
               onSelected: 'V2_Cancelacion_Anticipada',
               afterOnSelected: 'V2_CAC_Fin'
            });
            menuOptions.push({
               id: 'informar-pago',
               name: menuTexts.find(text => text.id === 'informar-pago').text, //'Informar que pagué – Adjuntar comprobante de pago', 
               onSelected: 'V2_Comprobante_Pago_Bandeja',
               afterOnSelected: 'V2_Cobranzas_Fin'
            });
            menuOptions.push({
              id: 'operador',
              name: menuTexts.find(text => text.id === 'operador').text, //'Quiero hablar con un operador', 
              onSelected: 'Hablar con operador',
              afterOnSelected: 'V2_Cobranzas_Fin'
            });
            ruleName = 'V2_Cobranzas_Menu';
          }
          user.set('menuOptions', JSON.stringify(menuOptions));
          result.gotoRule(ruleName);
          result.done();
        }).catch(err => {
          bmconsole.log(err.message);
          bmconsole.log(err.stack);
          result.gotoRule('V2_Cobranzas_Fin');
          result.done();
        });
  	}).catch(err => {
      bmconsole.log(err.message);
      bmconsole.log(err.stack);
      result.gotoRule('V2_Cobranzas_Fin');
      result.done();
    });
  });