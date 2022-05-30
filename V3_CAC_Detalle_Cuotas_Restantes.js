const SAPP_API_URL = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';
const SAPP_LOAN_ID = user.get('sappLoanId') || '';
const ID_CREDITO = SAPP_LOAN_ID === '' ? '' : `&idCredito=${SAPP_LOAN_ID}`;

rp({uri: `${SAPP_API_URL}/botmaker/loans/${context.userData.variables.dni}/status?accessToken=ELTOKENDEFEDE${ID_CREDITO}`, json: true})
  .then(loanDetails => {
  let arrayDeCuotas='';
  let saludoMultCreditos =  `Hola `+ user.get('fullNameClient') + `, tenés con nosotros ` + user.get('cantCreditos') + ` préstamos activos.`;
  
    if (loanDetails.hasLoan) { 
      if (loanDetails.installmentPlanDetailsList){ // Lista de las cuotas     
        var messageText = '';
        var textmsg ='';
        if(loanDetails.debtAmountMessage === null ){ // Mensaje del Monto de la deuda
          for( let installment of loanDetails.installmentPlanDetailsList ){
            if (installment.remainingInstallmentAmount !== 0 ) {
            	result.text(`Crédito por *$${installment.amountRequested}* en *${installment.totalInstallmentNumber}* cuotas fijas de *$${installment.installmentAmount}* y está al día.`);	
            	break;
          	}//termina el if 
          }//termina el for
        }//termina el primer if
        else {
          for( let installment of loanDetails.installmentPlanDetailsList ){
            if (installment.remainingInstallmentAmount !== 0 ) {
       	break;
          	}//termina el if 
          }//termina el for        
        }//termina el else
        bmconsole.log('8');
        if (loanDetails.debtAmount === true) { // Si tiene deuda recorre el array y da la sgte cuota
          bmconsole.log('8A',loanDetails.debtAmount);
            arrayDeCuotas = loanDetails.installmentPlanDetailsList.filter(objeto => objeto.remainingInstallmentAmount !== 0 );
          bmconsole.log('8B');
            arrayDeCuotas.shift(); //elimina el primer elemento del array y lo retorna. Este método modifica la longitud del array. 	         
          bmconsole.log('8C');
		    arrayDeCuotas.forEach((installment) => { //recorre nuevamente el array para devolverlo sin el primer elemento eliminado.
            	textmsg = textmsg + 'Cuota *' + installment.installmentNumber   + ':*  ';
              	textmsg = textmsg + ' *$' + installment.installmentAmount + '*. ';
              	textmsg = textmsg + '\n\n';      
            });
        }else { // Si no tiene deuda da desde la sgte cuota
                bmconsole.log('9');
                arrayDeCuotas = loanDetails.installmentPlanDetailsList.filter(objeto => objeto.remainingInstallmentAmount !== 0 );
                bmconsole.log('9A'); 	         
		        arrayDeCuotas.forEach((installment) => { //recorre nuevamente el array para devolverlo sin el primer elemento eliminado.
                    textmsg = textmsg + 'Cuota *' + installment.installmentNumber   + ':*  ';
                    //textmsg = textmsg + 'vence el *' + moment(installment.dueDate).format('DD/MM/YYYY') + '*. ';
                    textmsg = textmsg + ' *$' + installment.installmentAmount + '*. ';
                    textmsg = textmsg + '\n\n';      
                });
        }        
        bmconsole.log(' -CUOTAS- ',arrayDeCuotas.length);
        if(arrayDeCuotas.length >= 1){
        result.text("🗓️ Proximas cuotas a pagar \n"); 
        result.text(textmsg);
        } else {
        result.text("🗓️ No tienes cuotas futuras.");
        }
        result.done();
      }
    }
    result.done();
  }).catch(err => {
    result.text('En este momento no puedo enviarte el detalle de tus cuotas. Por favor intentá de nuevo en unos minutos.');
    result.done();
  });




  