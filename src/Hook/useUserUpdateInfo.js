import requestApi from "../Services/RequestAPI";
import useLocalStorage from "./useStorage";

const useUserUpdateInfo = {};

useUserUpdateInfo.updateInfoUser = async () => {
    const user = await useLocalStorage.getItem('UserItemID');
    
    if (user) {
        const userId = JSON.parse(user);
    }
}

export default useUserUpdateInfo;