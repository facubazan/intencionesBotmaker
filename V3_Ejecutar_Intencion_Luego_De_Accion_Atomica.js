const menuSelection = JSON.parse(user.get('menuSeleccion'));
if (menuSelection.afterOnSelected) {
	result.gotoRule(menuSelection.afterOnSelected);
  	bmconsole.log("MBP A",menuSelection.afterOnSelected);
} else if (context.params.defaultRule) {
	result.gotoRule(context.params.defaultRule);
  	bmconsole.log("MBP B",context.params.defaultRule);
} else {
	result.gotoRule('V3_Saludo_Fin');
  	bmconsole.log("MBP C",'V3_Saludo_Fin');
}
result.done();