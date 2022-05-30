let menuOptions = [];
user.get('cantCreditos');
bmconsole.log('VERSION DEL CHAT',user.get('chatVersion'));
bmconsole.log('CANTIDAD DE CREDITOS',user.get('cantCreditos'));

entityLoader('Menu Texts', menuTexts => {
    user.set('menuText', `✍🏻 Puedo ayudarte con:`);
        let ruleName = '';  

    if (user.get('cantCreditos')>= 2 ) {
        menuOptions.push({
            id: 'otro-credito',
            name: menuTexts.find(text => text.id === 'otro-credito').text, //' Seleccionar otro crédito', //
            onSelected: 'V3_Menu_creditos',
        });
    }
    menuOptions.push({
        id: 'volver-inicial',
        name: menuTexts.find(text => text.id === 'volver-inicial').text, //'Volver al menú inicial', 
        onSelected: 'V3_CAC_Dispatcher',
    });
    menuOptions.push({
        id: 'fin-consultas',
        name: menuTexts.find(text => text.id === 'fin-consultas').text, //'Finalizar, no tengo más consultas', 
        onSelected: 'V3_Saludo_Fin',
    });        
    
    user.set('menuOptions', JSON.stringify(menuOptions));
    result.gotoRule(ruleName);
    result.done();
});


