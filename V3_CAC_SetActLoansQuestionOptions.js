// toString() cuando es .00 lo remueve. ej 1603.00 -> "1603", 1603.01 -> "1603.01"
let toLocalCurrency = (value) => value.toString().search(/[.]/g) !== -1 ? toLocalCurrencyDigits(value, 2) : toLocalCurrencyDigits(value, 0);
let toLocalCurrencyDigits = (value, digits) => '$' + value.toLocaleString('en-US', { minimumFractionDigits: digits}).replace('.','_').replace(',','.').replace('_',',');

const sappApiUrl = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';
const ruleName = user.get('actLoanRuleName');
const actLoansOnlyCommerce = user.get('actLoansOnlyCommerce') || false;
user.set('actLoansOnlyCommerce', false);
user.set('cantCreditos',null);

let actLoansOfferOpts = [];
rp({uri: `${sappApiUrl}/zendesk/loans/${context.userData.variables.dni}/status/act?accessToken=ELTOKENDEFEDE`, json: true})
  .then(loanDetails => {  
	user.set('cantCreditos',loanDetails.length);
  bmconsole.log('A');
    if (loanDetails.length < 2) {
      bmconsole.log('B');
      bmconsole.log('CANTIDAD DE CREDITOS',loanDetails.length);
      if (loanDetails.length === 0) {
      result.gotoRule('V3_Preguntar_Otra_ConsultaMenu');
      } else {
      user.set('sappLoanId', loanDetails[0].sappLoanId);
      result.gotoRule(ruleName);
      }
    }
  bmconsole.log('C');
    loanDetails.forEach(function (loanDetail) {
      const optionName = `Nro de Crédito ${loanDetail.sappLoanId} en ${loanDetail.installmentsNumber} cuotas de ${toLocalCurrency(loanDetail.installmentAmount)}`;
      actLoansOfferOpts.push({
        id: '' + loanDetail.sappLoanId,
        data: loanDetail,
        name: optionName,        
      });            
    });
  bmconsole.log('D');
    user.set('actLoansOfferOpts', JSON.stringify(actLoansOfferOpts));
    result.done();
  })
  .catch(err => {
  bmconsole.log('E');
    result.text('En este momento no puedo enviarte el detalle de tus creditos activos.'/*'Por favor intentá de nuevo en unos minutos.'*/);
    result.done();
  });


  