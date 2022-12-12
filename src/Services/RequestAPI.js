const requestApi = {};

import useZoneApt from '../Hook/useZoneApt';
import Config from './ConfigApi'

requestApi.testConnection = async () => { // Se revisa que tengamos conexion con el servidor
    let response = false;

    const configInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + 'api/testConnection';
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        if (res) {
            response = res;
        }
    });

    return response;
}

requestApi.getDepartamentos = async () => { // Obtenemos todos los departamentos
    let response = false;
    const configInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + 'api/regional/departamentos';
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        if (res) {
            response = res;
        }
    });
    return response;
}

requestApi.listMunicipiosByDept = async (codDepa) => { // Obtenemos los municipios
    let response = false;
    const configInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/regional/municipios/${codDepa}`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        if (res) {
            response = res;
        }
    });
    return response;
}


requestApi.logingUserVisitante = async (data) => {
    let response = false;
    const configInit = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + 'api/User/loginVisitanteUser';
    await fetch(Url, configInit)
        .then(response => response.json())
        .catch(err => console.log(err))
        .then(res => {
            if (res) {
                response = res;
            }
        });
    return response;
}

requestApi.registerUserVisitante = async (data) => {
    let response = false;
    const configInit = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + 'api/User/registerVisitanteUser';
    await fetch(Url, configInit)
        .then(response => response.json())
        .catch(err => response = false)
        .then(res => {
            if (res) {
                console.log(res);
                response = res;
            }
        });
    return response;
}

requestApi.updateDataUserVistante = async (data) => {
    let response = false;
    const configInit = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + 'api/User/updateDataPersonUser';
    await fetch(Url, configInit)
        .then(response => response.json())
        .catch(err => {
            response = false
        })
        .then(res => {
            if (res) {
                response = res;
            }
        });
    return response;
}
requestApi.sendCodeMail = async (email) => { // Obtenemos los municipios
    let response = false;
    const configInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/User/changePassword/${email}`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        if (res) {
            response = res;
        }
    });
    return response;
}

requestApi.verifyMailAndCodeConfirm = async (email, data) => {
    let response = false;
    const configInit = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/User/changePassword/${email}`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        if (res) {
            response = res;
        }
    });
    return response;
}

requestApi.changePasswordForPassword = async (email, data) => {
    let response = false;
    const configInit = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/User/changePassword/${email}`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        if (res) {
            response = res;
        }
    });
    return response;
}

requestApi.listZonesApt = async () => { // Obtenemos la lista de las zonas del APT
    let response = false;
    const configInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/regional/listZoneApt`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        response = res;
    });
    return response;
}

requestApi.listTopSites = async () => { // Ontenemos los top 5 sitios con mas estrellas
    let response = false;
    const data = {
        zone: await useZoneApt.valZoneExist(),
    };

    const configInit = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/Sites/listTopSites`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        response = res;
    });
    return response;
}

requestApi.listAllSites = async () => { // Obtenemos todos los sitios
    let response = false;
    const data = {
        zone: await useZoneApt.valZoneExist(),
    };

    const configInit = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/Sites`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        response = res;
    });
    return response;
}

requestApi.listAllEvents = async () => {
    console.log("wtf");
    return true;
}

requestApi.listAllEventos = async () => { // Obtenemos todos los eventos
    let response = false;
    const data = {
        zone: await useZoneApt.valZoneExist(),
    };
    const configInit = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/Events`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        response = res;
    });
    return response;
}

requestApi.getDataSite = async (idSite) => { // Obtenemos los datos del sitio
    let response = false;
    const configInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/Sites/getSite/${idSite}`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        response = res;
    });
    return response;
}

requestApi.getDataEvent = async (idEvent) => { // Obtenemos los datos del sitio
    let response = false;
    const configInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/Events/getEvents/${idEvent}`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        response = res;
    });
    return response;
}

requestApi.saveComment = async (data) => { // Guardamos los comentarios
    let response = false;
    const configInit = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    const Url = Config.URL_COMPLATE + `api/Comments/saveComment`;
    await fetch(Url, configInit)
    .then(response => response.json())
    .catch(err => response = false)
    .then(res => {
        response = res;
    });
    return response;
}


export default requestApi;