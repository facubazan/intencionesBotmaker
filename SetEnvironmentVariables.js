if (user.get('botmakerEnvironment') === 'DEVELOPMENT') {
    user.set('sappApiUrl', 'https://uat-api.credicuotas.com.ar');
    user.set('sappWebUrl', 'https://uat.credicuotas.com.ar/sapp_uat');
    user.set('originationSelfieUrl', 'https://uat-origination-selfie.credicuotas.com.ar');
    user.set('originationPublicUrl', 'https://uat-origination-public.credicuotas.com.ar');
    user.set('originationAdminUrl', 'https://uat-origination-admin.credicuotas.com.ar');
    user.set('originationApiUrl', 'http://INT-cc-origination-api.zg4yhpqwwm.sa-east-1.elasticbeanstalk.com');
    user.set('originationApiUsername', 'api.whatsapp');
    user.set('originationApiPassword', 'ccWh4ts4pp');
    user.set('phpUrl_pdf','https://uat.credicuotas.com.ar/pdf_uat/');
  } else {
    // PRODUCTION
    user.set('sappApiUrl', 'https://api.credicuotas.com.ar');
    user.set('sappWebUrl', 'https://credicuotas.com.ar/sapp');
    user.set('originationSelfieUrl', 'https://clientes.credicuotas.com.ar');
    user.set('originationPublicUrl', 'https://comercios.credicuotas.com.ar');
    user.set('originationAdminUrl', 'https://admin-comercios.credicuotas.com.ar');
    user.set('originationApiUrl', 'https://api-origination.credicuotas.com.ar');
    user.set('originationApiUsername', 'api.whatsapp');
    user.set('originationApiPassword', 'ccWh4ts4pp');
    user.set('phpUrl_pdf','www.credicuotas.com.ar/pdf/');
  }
  result.done(); // do not forget to end the execution

  