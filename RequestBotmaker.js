// V3_CAC_SetActLoansQuestionOptions
    rp({uri: `${sappApiUrl}/zendesk/loans/${context.userData.variables.dni}/status/act?accessToken=ELTOKENDEFEDE`, json: true})
    .then(loanDetailsAct => { 
        /*
        {
   "uri":"https://uat-api.credicuotas.com.ar/zendesk/loans/24072045/status/act?accessToken=ELTOKENDEFEDE",
   "json":true
    },
    "okResult":[
    {
        "sappLoanId":"10496163",
        "customerId":"24072045",
        "customerTaxId":"20240720451",
        "sappCustomerId":"881762",
        "gdsHashCode":"orig_0286befa-9ab7-4c1a-adca-3cdf3b26f196",
        "createdDate":1633599584333,
        "welcomeInboxDate":1641570148960,
        "amountRequested":219200,
        "installmentsNumber":24,
        "installmentAmount":21310,
        "totalDebtAmount":23070.21,
        "productId":"2",
        "subProductId":59,
        "productDescription":"Moto - Zanella - 101cc a 150cc",
        "commerceName":"PRONTO MOTOS- SALTA",
        "customerFirstName":"ALCIDES NICOLAS",
        "customerLastName":"CHACHAGUA",
        "customerEmail":"nicolas.chachagua.pr@gmail.com",
        "maxOffer":372849,
        "requestState":"ACT  ",
        "blackList":false,
        "renewerCampaignMaxOffer":null,
        "cellPhoneNumber":"03868452011",
        "actLoansQuantity":null,
        "actLoansQuantityCommerce":null
    },
    {
        "sappLoanId":"5275439",
        "customerId":"24072045",
        "customerTaxId":"20240720451",
        "sappCustomerId":"881762",
        "gdsHashCode":"orig_e58f5fe1-4357-4910-a032-5dd673b77c7f",
        "createdDate":1589060077510,
        "welcomeInboxDate":1589316956843,
        "amountRequested":75000,
        "installmentsNumber":24,
        "installmentAmount":8913,
        "totalDebtAmount":9901.9,
        "productId":"19",
        "subProductId":55,
        "productDescription":"19",
        "commerceName":"WEB TRADICIONAL",
        "customerFirstName":"ALCIDES NICOLAS",
        "customerLastName":"CHACHAGUA",
        "customerEmail":"nicolas.chachagua.pr@gmail.com",
        "maxOffer":75000,
        "requestState":"ACT  ",
        "blackList":false,
        "renewerCampaignMaxOffer":null,
        "cellPhoneNumber":"03868452011",
        "actLoansQuantity":null,
        "actLoansQuantityCommerce":null
    }   
        */
    })
    .catch(err => {
        result.text('En este momento no puedo enviarte el detalle de tus creditos activos.' );
        result.done();
    });

// v3 cobranza dispatcher y ver Estado de cuenta
    rp({uri: `${sappApiUrl}/botmaker/loans/${context.userData.variables.dni}/status?accessToken=ELTOKENDEFEDE`, json: true})    	
        .then(loanStatus => {
        /*
            {
    "uri":"https://uat-api.credicuotas.com.ar/botmaker/loans/24072045/status?accessToken=ELTOKENDEFEDE",
    "json":true
        },
        "okResult":{
        "hasLoan":true,
        "rejected":false,
        "rejectedMessage":null,
        "judicialStudyAssigned":false,
        "maxDaysWithDebt":30,
        "judicialStudyMessage":null,
        "debtAmount":true,
        "debtAmountMessage":"Hola ALCIDES NICOLAS, detectamos que tenés *2* préstamos activos con nosotros. Al día de hoy estamos registrando un atraso en tus pagos por un total de *$32.972,11*, ahora podés ponerte al día con tu tarjeta de débito y sin moverte de tu casa.\\n",
        "debtAmountURL":"https://uat-origination-selfie.credicuotas.com.ar/#/voucher/86sgR5GzbJcsadh2BDN06A",
        "allUpToDate":true,
        "allUpToDateMessage":"Hola ALCIDES NICOLAS, tenés con nosotros un préstamo activo por tu compra en PRONTO MOTOS- SALTA en 24 cuotas fijas de $21.310,00. A la fecha de hoy se encuentra en situación normal.\\n",
        "allUpToDateURL":"https://uat-origination-selfie.credicuotas.com.ar/#/voucher/86sgR5GzbJcsadh2BDN06A",
        "mustContinueLoan":false,
        "mustContinueLoanURL":null,
        "mustContinueLoanMessage":null,
        "loanIsInWelcomeInbox":false,
        "cancelled":true,
        "cancelledMessage":"Hola ALCIDES NICOLAS, vemos que ya posees un préstamo cancelado con nosotros, el motivo de tu consulta es para pedir un libre deuda del mismo o en realidad querés consultar por un préstamo nuevo?",
        "debtFreeDownloadUrl":null,
        "debtFreeNotAvailable":true,
        "paymentCode":"12381049616399",
        "paymentInfoDocumentUrl":"https://uat-api.credicuotas.com.ar/botmaker/paymentinfo/10496163?accessToken=E78D01421B45D53CAFEEC12BBD317628",
        "blackList":false,
        "mostRecentCancelledLoanId":1339852,
        "fraud":null,
        "renewersCampaignSale":false,
        "renewersCampaignSaleMessage":null,
        "canceledMessageWithJuridisctionalStudyAssigned":null,
        "isClient":true,
        "loanHashKey":null,
        "loanId":"10496163",
        "status":"ACT",
        "deceased":false,
        "installmentPlanDetailsList":[
            {
                "installmentNumber":1,
                "remainingInstallmentAmount":0,
                "paymentsMadeAmount":22023.39,
                "totalDebtAmount":0,
                "totalLoanDebtAmount":23070.21,
                "dueDate":1636329600000,
                "welcomeInboxDate":1633612896530,
                "lastPaymentDate":1636934400000,
                "loanId":10496163,
                "amountRequested":219200,
                "installmentAmount":21310,
                "totalInstallmentNumber":24,
                "penalties":713.39,
                "paymentCode":"12381049616399",
                "productDescription":"Moto - Zanella - 101cc a 150cc",
                "commerceName":"PRONTO MOTOS- SALTA",
                "productId":2
            },
            {
            "installmentNumber":6,
            "remainingInstallmentAmount":0,
            "paymentsMadeAmount":21310,
            "totalDebtAmount":0,
            "totalLoanDebtAmount":23070.21,
            "dueDate":1649376000000,
            "welcomeInboxDate":1633612896530,
            "lastPaymentDate":1649462400000,
            "loanId":10496163,
            "amountRequested":219200,
            "installmentAmount":21310,
            "totalInstallmentNumber":24,
            "penalties":0,
            "paymentCode":"12381049616399",
            "productDescription":"Moto - Zanella - 101cc a 150cc",
            "commerceName":"PRONTO MOTOS- SALTA",
            "productId":2
        },
        {
            "installmentNumber":7,
            "remainingInstallmentAmount":21310,
            "paymentsMadeAmount":0,
            "totalDebtAmount":23070.21,
            "totalLoanDebtAmount":23070.21,
            "dueDate":1651968000000,
            "welcomeInboxDate":1633612896530,
            "lastPaymentDate":null,
            "loanId":10496163,
            "amountRequested":219200,
            "installmentAmount":21310,
            "totalInstallmentNumber":24,
            "penalties":0,
            "paymentCode":"12381049616399",
            "productDescription":"Moto - Zanella - 101cc a 150cc",
            "commerceName":"PRONTO MOTOS- SALTA",
            "productId":2
        },
        */
        })
        .catch(err => {
            result.text('En este momento no puedo enviarte el detalle de tus creditos activos.');
            result.done();
        }); 

// v3 cobranza dispatcher y ver Estado de cuenta
    rp({uri: `${sappApiUrl}/zendesk/loan-details?dni=${context.userData.variables.dni}&accessToken=ELTOKENDEFEDE`, json: true})
        .then(loanDetails => {
        /*
        {
            "uri":"https://uat-api.credicuotas.com.ar/zendesk/loan-details?dni=24072045&accessToken=ELTOKENDEFEDE",
            "json":true
        },
        "okResult":{
            "sappLoanId":"10496163",
            "customerId":"24072045",
            "customerTaxId":"20240720451",
            "sappCustomerId":"881762",
            "gdsHashCode":"orig_0286befa-9ab7-4c1a-adca-3cdf3b26f196",
            "createdDate":1633599584333,
            "welcomeInboxDate":1641570148960,
            "amountRequested":219200,
            "installmentsNumber":24,
            "installmentAmount":21310,
            "totalDebtAmount":23070.21,
            "productId":"2",
            "subProductId":59,
            "productDescription":"Moto - Zanella - 101cc a 150cc",
            "commerceName":"PRONTO MOTOS- SALTA",
            "customerFirstName":"ALCIDES NICOLAS",
            "customerLastName":"CHACHAGUA",
            "customerEmail":"nicolas.chachagua.pr@gmail.com",
            "maxOffer":372849,
            "requestState":"ACT  ",
            "blackList":false,
            "renewerCampaignMaxOffer":null,
            "cellPhoneNumber":"03868452011",
            "actLoansQuantity":2,
            "actLoansQuantityCommerce":1
        }*/
        })
    .catch(err => {
        result.text('En este momento no puedo enviarte el detalle de tus creditos activos.');
        result.done();
    });