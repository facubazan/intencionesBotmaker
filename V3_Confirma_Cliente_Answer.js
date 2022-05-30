const selectedCustomer = JSON.parse(user.get('obCustomerTaxIdAns'));
if (selectedCustomer.id === 'none') {
  user.set('dni', null);
  result.gotoRule('V3_Saludo_Solicitar_DNI');
  result.done();
} else {
    result.gotoRule('V3_Saludo_Dispatcher_Cliente');
    user.set('obCustomerTaxIdAns', null);
    result.done();
}