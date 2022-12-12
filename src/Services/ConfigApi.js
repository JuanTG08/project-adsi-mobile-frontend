const PROTOCOLO_WEB = 'http://';
const DOMINIO_PRINCIPAL = '172.20.10.2'; // IP Or localhost
const PORT = ':8000';
const SLUG = '/';


const DOMAIN_IMAGES = '172.20.10.2';

const parametersCon = {
    PROTOCOLO_WEB,
    DOMINIO_PRINCIPAL,
    PORT,
    SLUG,
    URL_COMPLATE: PROTOCOLO_WEB + DOMINIO_PRINCIPAL + PORT + SLUG,
    DOMAIN_IMAGES,
}

export default parametersCon;