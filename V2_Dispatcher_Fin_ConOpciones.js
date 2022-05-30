const menuValues = JSON.parse(user.get('menuValues'));
const menuTitle = menuValues.menuTitle || 'Podes continuar con alguna de estas opciones:';
user.set('genericMenuTitle', menuTitle);

let menuOptions = [];
entityLoader('Menu Texts', menuTexts => {        
      menuValues.options.forEach(option => {         
        const optionId = user.get(option.textId) || option.textId;
        const optionRuleName = user.get(option.ruleName) || option.ruleName;                	
        menuOptions.push({
          id: 'grabar-can-ant',
          name: menuTexts.find(text => text.id === 'grabar-can-ant').text, // Grabar la Cancelación Anticipada 
          onSelected: 'V3_Grabar_CA',
        });
      });      
      menuOptions.push({
        id: 'volver-inicial',
        name: menuTexts.find(text => text.id === 'volver-inicial').text, //'Volver al menú inicial', 
        onSelected: menuValues.initMenuToComeback        
      });
      menuOptions.push({
        id: 'fin-consultas',
        name: menuTexts.find(text => text.id === 'fin-consultas').text, //'Finalizar, no tengo más consultas', 
        onSelected: 'V2_Saludo_Fin',
        npsTypeToExecute: menuValues.npsTypeToExecute
      });          
      user.set('menuOptions', JSON.stringify(menuOptions));
      result.gotoRule('V3_Menu3OptCA');
      result.done();        
});



