import useLocalStorage from "./useStorage";

const useRedirect = {};

useRedirect.isLoged = async () => {
    const getUserSession = await useLocalStorage.getItem('UserItemID');
    if (!getUserSession) return false;
    else return true;
}

export default useRedirect;