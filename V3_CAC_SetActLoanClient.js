const sappApiUrl = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';

rp({uri: `${sappApiUrl}/zendesk/loans/${context.userData.variables.dni}/status/act?accessToken=ELTOKENDEFEDE`, json: true})
  .then(loanDetails => {  
	
  	bmconsole.log('A');
   	let totalAmount = 0;  
    loanDetails.forEach(function (loanDetail) {
      bmconsole.log('B');
      totalAmount = totalAmount + loanDetail.totalDebtAmount;            
    });
  	bmconsole.log("Total de la deuda es:",totalAmount);
  	user.set('accumulatedTotalDebtAmount',totalAmount);
  	bmconsole.log('C');
    result.done();
  })
  .catch(err => {  
    result.done();
  });
