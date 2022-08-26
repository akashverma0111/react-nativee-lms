import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const API_URL = 'https://weteach.api.xticode.live/public/api/'

export const storeData = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

export const retriveData = async (key, value) => {
    await AsyncStorage.getItem(key, value);
};

export const removeData = async (key) => {
    await AsyncStorage.removeItem(key);
};

export const ShowAlert = (msg) => {
    Alert.alert(msg)
};



export const fetchData = async (url, method, data, token, process, res, err, blob = false, loader = true) => {
    let headers = {
        'Accept': 'application/json',
    }

    if(process){
        headers = {...headers, 'contentType': false, 'processData': false}
    }else{
        headers = {...headers, 'Content-Type': 'application/json'}
    }

    if(token){
        const TOKEN = ''
        getData("wt-token", (err, res) => TOKEN = res ? res : '')
        headers = {...headers, 'Authorization': 'Bearer ' + TOKEN}
    }

    let request = {
        'method': method,
        'headers': headers,
    }

    if(data){
        request = {...request, 'body': process ? data : JSON.stringify(data)}
    }
    
    await fetch(`${API_URL}${url}`, request).then((response) => blob ? response.blob() : response.json()).then((json) => {
        if(json.message === "Unauthenticated."){
            removeData("wt-token")
            // window.location.href = '/login'
        }else{
            res(json)
        }
    }).catch((error) => { });
}