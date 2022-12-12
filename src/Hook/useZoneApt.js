import useLocalStorage from "./useStorage";

const useZoneApt = {};

useZoneApt.valZoneExist = async () => {
    const zone = await useLocalStorage.getItem("ZoneApt");
    return zone ? zone : "VIL";
}

export default useZoneApt;