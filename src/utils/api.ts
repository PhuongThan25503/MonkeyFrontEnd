import * as KeyChain from 'react-native-keychain';
import { SECURE_KEY } from '../config';

//get the api
export const GetAPIToken = async () => {
    let apitoken = '';
    //get token
    await KeyChain.getGenericPassword({
      service: SECURE_KEY,
    }).then(data => {
      if (data) {
        apitoken = data.password;
      } else apitoken = 'no token';
    });
    //return the token
    return apitoken;
}

