const useValidate = {};

useValidate.email = (mail) => {
    const expresionMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return (expresionMail.test(mail)) ? mail : false;
}

useValidate.verifyLengthString = (string, max, min = 0) => {// Verificamos la cantidad de caracteres de una cadena
    if (string == undefined) return false;
    stringStr = String(string);
    lengthStr = stringStr.length;
    return (lengthStr >= min && lengthStr <= max) ? string : false;
}

useValidate.verifyObjectData = (data, exception = []) => {
    let inputBad = [];
    for (let indice in data) {
        value = data[indice];
        if (exception.find(e => e == indice)) continue;
        if (value == false || value.length < 1 || typeof value == undefined || value == null) {
            inputBad.push(indice);
        }
    }
    console.log(inputBad == []);
    return (inputBad == []) ? false : inputBad;
}

export default useValidate;