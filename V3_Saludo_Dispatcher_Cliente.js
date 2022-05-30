const SAPP_API_URL = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';
user.set('marcafallecido',null);

rp({uri: SAPP_API_URL + '/botmaker/loans/' + context.userData.variables.dni + '/status?accessToken=ELTOKENDEFEDE', json: true})
  .then(loanDetails => {
  	let productId = loanDetails.idProduct;
  	let marcafallecido = loanDetails.deceased;	
  	
    if (productId === 19 && loanDetails.mustContinueLoan && !loanDetails.isClient) {
      if (loanDetails.loanHashKey != null) {
      	user.set('obLastLoanHash', loanDetails.loanHashKey);
        result.gotoRule('OnboardingDispatcher');
      } else {
      	result.text(loanDetails.mustContinueLoanMessage); 
        result.gotoRule('onboardingInit');
      }
    }  
  	 if( marcafallecido === true ){
        result.text('Según nuestro sistema este DNI ya no registra actividad porque fue informado como fallecido.\n\nGracias por comunicarse con nosotros.');
      	result.gotoRule('Finalizar conversación');
    } else if (loanDetails.fraud) {
      result.gotoRule('Responder a usuario con última solicitud en estado FRA');
    } else if (loanDetails.blackList) {
      result.gotoRule('Responder a usuario en blacklist');        	
    } else if (loanDetails.hasLoan) {
      if (loanDetails.judicialStudyAssigned) {
        result.gotoRule('V3_Cobranzas_Init');
      } else if (loanDetails.debtAmount) { 
        result.gotoRule('V3_Cobranzas_Init');
      } else if (loanDetails.renewersCampaignSale) { 
        // si esta en campaña renovador
        result.gotoRule('V3_CAC_Init');
      } else if (loanDetails.rejected) { 
        //si esta rechazado
        result.gotoRule('V3_CAC_Init');
      } else if (loanDetails.allUpToDate && !loanDetails.debtAmount) { 
        //si tiene todo actualizado y monto de la deuda es distinta (NO TIENE DEUDA)
        result.gotoRule('V3_CAC_Init');
      } else if (loanDetails.cancelled) { 
        // si esta cancelado
        result.gotoRule('V3_CAC_Init');
      } else if (loanDetails.mustContinueLoan && loanDetails.isClient) { 
        // debe continuar con el prestamo y es cliente
      	result.gotoRule('V3_CAC_Init');
      } else {
        result.gotoRule('V3_CAC_Init');
      }
    } else {
      result.text('No encontramos créditos activos con tu DNI. Si queres ser cliente volvé a escribirme y seleccioná la opción *Quiero un Préstamo*.');
      result.gotoRule('V3_Saludo_Fin');
    }
  	result.done();
  }).catch(err => {
    result.text('En este momento no podemos obtener los detalles de tu situación con Credicuotas');
    result.gotoRule('V3_Saludo_Fin');
    result.done();
  });