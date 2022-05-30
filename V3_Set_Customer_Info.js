/**
 * Setea todas las variables con la información del cliente que necesitan
 * los operadores.
 */

 const setExclusiveTag = (tagName) => {
    for (let i = 0; i < context.userData.tags.length; i++) {
        user.set(context.userData.tags[i], null);
    }
    user.set(tagName, 'true');
  };
  
  const sappApiUrl = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';
  const sappWebUrl = 'https://credicuotas.com.ar/sapp';
  const originationAdminUrl = user.get('originationAdminUrl') || 'https://admin-comercios.credicuotas.com.ar';
  
  
  rp({uri: `${sappApiUrl}/zendesk/loan-details?dni=${context.userData.variables.dni}&accessToken=ELTOKENDEFEDE`, json: true})
      .then(loanDetails => {
            user.set('descripcionCliente', null);
            user.set('fichaDelCliente', null);
            user.set('descripcionCredito', null);
            user.set('fichaDelCredito', null);
            user.set('cacLoanCreatedDate', null);
            user.set('cantCreditos',null);
  
            if (loanDetails && loanDetails.sappCustomerId) {
              user.set('firstName', `${loanDetails.customerLastName} ${loanDetails.customerFirstName}`);
                user.set('descripcionCliente', `${loanDetails.customerLastName} ${loanDetails.customerFirstName} (${loanDetails.customerId})`);
                user.set('fichaDelCliente', `${sappWebUrl}/abm_clientes.aspx?IdCliente=${loanDetails.sappCustomerId}`);
                user.set('fichaDelCredito', `${sappWebUrl}/datos_credito.aspx?IdCredito=${loanDetails.sappLoanId}&nombre=Id Credito ${loanDetails.sappLoanId} - ${loanDetails.customerLastName} ${loanDetails.customerFirstName} DNI ${loanDetails.customerId}`);
                user.set('amountOfferedRenewer', loanDetails.renewerCampaignMaxOffer);
              user.set('obCustomerTaxId', loanDetails.customerTaxId);
                user.set('cacLoanCreatedDate', loanDetails.createdDate);
              user.set('sappCustomerId', loanDetails.sappCustomerId);
                user.set('customerEmail', loanDetails.customerEmail);
                user.set('sappLoanId', loanDetails.sappLoanId);
                user.set('cantCreditos',loanDetails.length);
              user.set('customerCellPhoneNumber', loanDetails.cellPhoneNumber);
              if (loanDetails.amountRequested && loanDetails.amountRequested > 0) {
                  user.set('descripcionCredito', `Últ. crédito ${loanDetails.requestState.trim()}, $${loanDetails.amountRequested} en ${loanDetails.installmentsNumber} cuotas de $${loanDetails.installmentAmount}`);
              } else {
                    user.set('descripcionCredito', `Últ. crédito ${loanDetails.requestState.trim()}, máximo ofrecido: $${loanDetails.maxOffer}`);
              }
                if (loanDetails.productId === '19') {
                user.set('callcenterLink', originationAdminUrl + '/#/callCenterTool?redirectUrl=callCenterTool/' + loanDetails.gdsHashCode);
              }
              saveCustomerAlternateCellphone(loanDetails.sappCustomerId);
              setSubProductId(loanDetails.subProductId);
          }
    
            //si hay parametros de la accion
            if (context.params.tagName){
                //si hay mas de un tag a setear me fijo si los tags a setear son Bienvenida o Ventas y aplico la logica
                var tags = context.params.tagName.split(',');
                var tagToUse = tags[0];
                if (tags.length > 1){
                   if (tags.includes("Bienvenida") && tags.includes("Ventas")) {
                        if (loanDetails.welcomeInboxDate !== undefined && loanDetails.welcomeInboxDate !== null && loanDetails.requestState.includes('PRE')){
                            tagToUse = 'Bienvenida'; 
                        }else{
                          tagToUse =  'Ventas';
                        }
                  }
              }
                setExclusiveTag(tagToUse);
          }
    
            result.done();
      }).catch(err => {
          result.done();
      });
  
  var saveCustomerAlternateCellphone = function (sappCustomerId) {
      if (sappCustomerId && context.userData.CHAT_PLATFORM_ID === 'whatsapp') {
          rp({
              method: 'POST',
              uri: `${sappApiUrl}/customer/${sappCustomerId}/alternateCellphones?accessToken=ELTOKENDEFEDE`,
              body: context.userData.PLATFORM_CONTACT_ID,
              json: false
          }).then(json => {
              
          })	.catch(err => {
              
          });
      }
  };
  
  let setSubProductId = (subProductId) => {
    if (!subProductId) return;
    switch (subProductId) {
      case 38:
        user.set('subProductId', `WT (${subProductId})`);
        break;
      case 56: 
        user.set('subProductId', `WT ADELANTOS (${subProductId})`);
        break;
      case 55:
        user.set('subProduct', `WT RENOVADORES (${subProductId})`);
        break;
      default:
        user.set('subProduct', `WC (${subProductId})`);
    }
  };


  