const menuSelection = JSON.parse(user.get('menuSeleccion'));

  if (user.get('npsType') === "" || user.get('npsType') === null ){
    user.set('npsType',menuSelection.npsTypeToExecute);
  }
    //result.text(user.get('npsType'));
	result.gotoRule(menuSelection.onSelected);
	result.done();