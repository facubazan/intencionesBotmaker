user.set('sappLoanId', null);
const selectedLoan = JSON.parse(user.get('canLoansAns'));
if (selectedLoan.id === 'none') {
  result.gotoRule('Enviar_Libre_Deuda_Menu');
} else {
  user.set('sappLoanId', selectedLoan.id);
  user.set('customerLoanId', selectedLoan.customerSappId);
  result.text('Le enviamos a continuación el libre deuda de su crédito cancelado. Haga click sobre el enlace para verlo');
  user.set('urlLibreDeuda', (user.get('phpUrl_pdf') + 'reportes/libre_deuda.php' + '?id=' + selectedLoan.id + '&c=' + selectedLoan.data.customerSappId + '&t=' + selectedLoan.data.clientToken + '=bot'));
 
}
user.set('canLoansAns', null);
result.done();

//https://uat.credicuotas.com.ar/pdf_uat/reportes/libre_deuda.php?id=6203702&c=841250&t=BA94D205-3D8E-4A6A-877A-195EAC20063E=MPODLYESNY