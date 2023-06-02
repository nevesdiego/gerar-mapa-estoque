import qs from "qs"

const URLBASE = "https://newapi.cosmospro.com.br/api/Forms"
export const URLCustonAction = "https://portal.cosmospro.com.br:9191/api/ExecuteCustomAction/ExecuteAction?ActionName=Formularios_Mapa_Estoque"



export function configSaveMaster(selectedCompany:number, finalYear: number, initialYear: number, finalMonth: number, initialMonth: number, userId: number, token: string) {
    let data = {
        'ANO_FINAL': finalYear,
        'ANO_INICIAL': initialYear,
        'MES_FINAL': finalMonth,
        'MES_INICIAL': initialMonth,
        'USUARIO_CRIADOR_REGISTRO': userId
    };
    return getConfigFields(token, data,`${URLBASE}/SaveRecord(formId=${selectedCompany})`);
}


export function configGetInitialMonthList(token:string){
    let data = qs.stringify({
        'requireTotalCount': true,
        'sort': [{"selector":"MES","desc":true}],
        'select': ["MES","DESCRICAO"],
        'entityId': 43144,
        'executionParameters': [],
        'currentFormData': {},
        'ReferencedLookupFormField': 106296
    });
    return configGet(token,data)
}
export function configGetYearList(token:string){
    let data = qs.stringify({
        'requireTotalCount': true,
        'sort': [{"selector":"ANO","desc":true}],
        'select': ["ANO"],
        'entityId': 43268,
        'executionParameters': [],
        'currentFormData': {},
        'ReferencedLookupFormField': 106294
    });
    return configGet(token,data)
}


function configGet(token: string, data: string) {
    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${URLBASE}/Records`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
}

export function getConfigFields(token: string, data: any, url:string) {
    return {
        method: 'post',
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data: data
    };
}

export function getHeaders(token:string){
    let newToken = token
    return {
      headers: {
        'Authorization': `Bearer ${newToken}`,
        'api-version': 1,
      }
    }
  }

export const getUserToken = (token:string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
  }