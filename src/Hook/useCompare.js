const useCompare = {};

useCompare.Objects = (lastObj, newObj) => {
    let response = false;
    for (let dataObj in newObj) {
        if (newObj[dataObj] != lastObj[dataObj]) {
            response = true;
            break;
        }
    }
    return response;
}

export default useCompare;