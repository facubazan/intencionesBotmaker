entityLoader('Menu Texts', menuTexts => {
    const menuOptions = [
      {
        id: 'customer',
        name: menuTexts.find(text => text.id === 'customer').text, //'Soy Cliente!',
        onSelected: 'V3_Saludo_Solicitar_DNI',
        afterOnSelected: 'V3_Saludo_Dispatcher_Cliente'
      },
      {
        id: 'onboarding',
        name: menuTexts.find(text => text.id === 'onboarding').text, //'Quiero un Prestamo',
        onSelected: 'V2_Ventas_Init',
      },
      {
        id: 'faq',
        name: menuTexts.find(text => text.id === 'faq').text, //'Preguntas Frecuentes',
        onSelected: 'V2_FAQ_Init'
      }
    ];
    user.set('menuOptions', JSON.stringify(menuOptions));
    result.gotoRule('V3_Saludo_Menu');
    result.done(); // do not forget to end the execution
  });