user.set('sappLoanId', null);
const selectedLoan = JSON.parse(user.get('actLoansAns'));
if (selectedLoan.id === 'none') {
  result.gotoRule('V3_Menu_creditos');
} else {
  user.set('sappLoanId', selectedLoan.id);
  user.set('customerLoanId', selectedLoan.id);
  var canAnt = user.get('esCancelacionAnticipada');
  bmconsole.log("MBP",selectedLoan.id);
  result.gotoRule('V3_CAC_Detalle_Cuotas_Restantes'); 
  bmconsole.log("ir a una intencion",selectedLoan.onSelected);
  
}
user.set('actLoansAns', null);
result.done();