//uat-api.credicuotas.com.ar/sp/generacancelacionanticipada?usuario=WhatsapCAC&minimoCalculado=31903.17&creditoRelacionadoId=&sappLoanId=9305292&idCanal=1&accessToken=ELTOKENDEFEDE

const SAPP_API_URL = user.get('sappApiUrl') || 'https://api.credicuotas.com.ar';
const SAPP_LOAN_ID = user.get('sappLoanId') || '';
const ID_CREDITO = SAPP_LOAN_ID === '' ? '' : `${SAPP_LOAN_ID}`;
const IMPMINCA = user.get('impMinCA');

bmconsole.log('1- IMPMINCA',IMPMINCA);

  rp({	method: 'POST',
    	uri: `${SAPP_API_URL}/sp/generacancelacionanticipada?usuario=WhatsapCAC&minimoCalculado=${IMPMINCA}&creditoRelacionadoId=&sappLoanId=${SAPP_LOAN_ID}&idCanal=1&accessToken=ELTOKENDEFEDE`,
       	json: true})
    .then(response => {       
    rp({uri: `${SAPP_API_URL}/sp/cancelacionanticipadaimporte?idCredito=${ID_CREDITO}&idCanal=1&accessToken=ELTOKENDEFEDE`, json: true})
          .then(response => {
              bmconsole.log('ID',response.id);
      
              const idCanAnt = response.id;
              user.set('urlCanAnt', (user.get('phpUrl_pdf') + 'credishop/cacomprobante.php' + '?id=' + `${idCanAnt}` ));
              //https://uat.credicuotas.com.ar/pdf_dev/credishop/cacomprobante.php?id=27498
      		  bmconsole.log(user.get('urlCanAnt'));
      		  
      		  result.done();
          })
          .catch(err => {
            // Code on error
          bmconsole.log('error - en el GET');
            const errorMessage = `[CA_NAME] Error ${err.message}`;
            user.set('ca_error', errorMessage); // Set error variable with error message to see on Events
            bmconsole.log(errorMessage); // Log Error
            result.done();
          });
    })
    .catch(err => {
      // Code on error
      bmconsole.log('error - en el POST');
      const errorMessage = `[CA_NAME] Error ${err.message}`;
      user.set('ca_error', errorMessage); // Set error variable with error message to see on Events
      bmconsole.log(errorMessage); // Log Error
      result.text('*En esta fecha no esta vigente la cancelación anticipada.*\n*Podes realizarla a partir del 1 del próximo mes.*');
      result.done();
    });

