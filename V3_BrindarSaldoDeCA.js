//uat-api.credicuotas.com.ar/sp/cancelacionanticipadaimporte?idCredito=xxxxxx&idCanal=yyyyyy

const SAPP_API_URL = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';
const SAPP_LOAN_ID = user.get('sappLoanId') || '';
const ID_CREDITO = SAPP_LOAN_ID === '' ? '' : `${SAPP_LOAN_ID}`;


bmconsole.log('1');
rp({uri: `${SAPP_API_URL}/sp/cancelacionanticipadaimporte?idCredito=${ID_CREDITO}&idCanal=1&accessToken=ELTOKENDEFEDE`, json: true})
  .then(response => {
  bmconsole.log('2');
  		bmconsole.log(response.importeMinimo);
  		let importMin = response.importeMinimo; 
 		user.set('impMinCA',Math.round(importMin*100)/100);
  		bmconsole.log('importe minimo de cancelacion $ ', Math.round(importMin*100)/100);  

		const message = "Saldo a pagar *$" + Math.round(importMin*100)/100 + "* por cancelacion anticipada.";
  		const msg1 = "Para que se genere el documento con este saldo de cancelación anticipada debe confirmarlo.";
    	const msg2 = "\nTene presente que *Grabar la cancelación anticipada no Genera obligación de pago.* \n";
    	const adv = msg1 + msg2 + "Podes continuar pagando tus cuota mensualmente e ignorar el documento.";
  
		result.text(message + "\n\n" + adv);	
		result.gotoRule('V3_CAC_Fin_ConOpcionesCA');
  		
  bmconsole.log('dentro de la rq');
  })
  .catch(err => {
  	// Code on error
  bmconsole.log('3');
  	const errorMessage = `[CA_NAME] Error ${err.message}`;
    user.set('ca_error', errorMessage); // Set error variable with error message to see on Events
    bmconsole.log(errorMessage); // Log Error
    result.text('En este momento no puedo enviarte el detalle de tu gestion. Por favor intentá de nuevo en unos minutos.');
    result.done();
  })
 .finally(result.done);

 