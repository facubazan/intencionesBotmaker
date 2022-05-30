const sappApiUrl = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';
let menuOptions = [];
entityLoader('Menu Texts', menuTexts => {
  rp({uri: `${sappApiUrl}/zendesk/loan-details?dni=${context.userData.variables.dni}&accessToken=ELTOKENDEFEDE`, json: true})
    .then(loanDetails => {
      const installmentsNumberText = (loanDetails.installmentsNumber > 1) ? 'cuotas' : 'cuota';
      var loanSummaryText = `${loanDetails.customerFirstName}, tenés un préstamo con nosotros de $${loanDetails.amountRequested} en ${loanDetails.installmentsNumber} ${installmentsNumberText}.\n'`;        
      rp({uri: `${sappApiUrl}/botmaker/loans/${context.userData.variables.dni}/status?accessToken=ELTOKENDEFEDE`, json: true})    	
        .then(loanStatus => {
            let ruleName="";
        	let saludoGeneric= `${loanDetails.customerFirstName}, tenés un préstamo activo con nosotros de *$${loanDetails.amountRequested}*`;
        	let saludoMultCreditos = `${loanDetails.customerFirstName}, tenés con nosotros ${loanDetails.actLoansQuantity} préstamos activos.`;
            let messageInformation = `⚠️ *Información importante* ⚠️\n\n `;
        	let msg48hs = "Si pagaste recientemente aguarda *48hs.* para que se vea reflejado en nuestro sistema.\n\n";
        	let msgCanceled = "Vemos que ya posees un préstamo cancelado con nosotros.";
        	let accumulatedDebt = null ;
        	user.set('fullNameClient',loanDetails.customerFirstName);
  
          const productId = loanStatus.idProduct;
            ruleName = 'V3_Menu_creditos';
          if (loanStatus.fraud) {
              ruleName = 'V2_Marcar_Como_Fraude';
          } else if (loanStatus.blackList) {
              ruleName = 'V2_Marcar_Como_Blacklist';
          } else if (loanStatus.hasLoan) {
            if (loanStatus.rejected) {
              if (user.get('cacLoanCreatedDate')) {
                const loanCreatedDate = moment(parseInt(user.get('cacLoanCreatedDate')));
                const limit = moment().subtract(3, 'months');
                if (loanCreatedDate.isBefore(limit)) {
                  ruleName = 'V2_Derivar_A_Ventas';
                }
              }
              ruleName = 'V2_Marcar_Como_Rechazado_Con_Mensaje';

            } else if (!loanStatus.debtAmount && loanDetails.actLoansQuantity > 0) {
              if (loanStatus.allUpToDateMessage) { // el actual es ACT
                user.set('sappLoanId', loanDetails.sappLoanId);
                user.set('CACaldia', 'true');
              }
              if (loanDetails.actLoansQuantity > 1) { // ademas tiene varios ACT
                var allUpToDateMessageForMany = `${loanDetails.customerFirstName}, tenés con nosotros ${loanDetails.actLoansQuantity} préstamos activos.\n\n`;
                user.set('menuText', allUpToDateMessageForMany); 
              }
              else { // tiene solo 1 ACT               	
				if (loanStatus.allUpToDateMessage) { // el actual es ACT 
                  var aloneLoanActiv = saludoGeneric + ` en *${loanDetails.installmentsNumber}* cuotas fijas.`;
                  user.set('menuText', aloneLoanActiv);
                } else { // el actual es PEN
                  var otherActiveMessage = `Hola ${loanDetails.customerFirstName}, tenés un préstamo activo con nosotros.\n`;
                  user.set('menuText', otherActiveMessage );     
                }                
              }
            } else if (loanStatus.debtAmountMessage && loanDetails.actLoansQuantity <= 1){ // un solo credito ACT en mora         
              let condicion1 =loanStatus.debtAmountMessage && loanDetails.actLoansQuantity <= 1;
              bmconsole.log('condicion1');
              
            	let aloneLoanActivMora = saludoGeneric +` y con un *saldo impago* de *$${loanDetails.totalDebtAmount}* `;
				user.set('menuText', messageInformation + "Si pagaste recientemente aguarda *48hs.* para que se vea reflejado en nuestro sistema.\n\n"+ aloneLoanActivMora);
              
            }else if(loanDetails.actLoansQuantity > 1 && loanStatus.debtAmountMessage){ // cuando hay mas de un credito 
              let condion2 =loanDetails.actLoansQuantity > 1 && loanStatus.debtAmountMessage;
              bmconsole.log('condion2');
              
            	var multiLoanActivMora = saludoMultCreditos +` Al día de hoy estamos registrando *un atraso en tus pagos* por un monto de *$`+ user.get('accumulatedTotalDebtAmount')+`*`;
         		user.set('menuText',messageInformation + msg48hs + multiLoanActivMora);
            
            } else if (loanStatus.cancelled) { // tiene un credito CAN
              	let cancel = loanStatus.cancelled;
                if(cancel === true){
                      user.set('menuText', messageInformation + msgCanceled );
                }				           
            } else if (loanStatus.debtAmount){
              ruleName = 'V3_Cobranzas_Init';
            }
          }
          user.set('hideRenewerMenu', null);
          user.set('menuOptions', JSON.stringify(menuOptions));
          result.gotoRule(ruleName);
          result.done(); // do not forget to end the execution
        }).catch(err => {
          bmconsole.log(err.message);
          bmconsole.log(err.stack);
          user.set('hideRenewerMenu', null);
            result.gotoRule('V3_CAC_Fin');
            result.done();
        });
    }).catch(err => {
      bmconsole.log(err.message);
      bmconsole.log(err.stack);
      user.set('hideRenewerMenu', null);
      result.gotoRule('V3_CAC_Fin');
      result.done();
    });
});

