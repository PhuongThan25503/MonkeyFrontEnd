import * as Keychain from 'react-native-keychain';
import { IP, SECURE_KEY } from '../config';
import axios from 'axios';

//get the api token
export const getAPIToken = async () => {
    let apitoken = '';
    //get token
    await Keychain.getGenericPassword({
      service: SECURE_KEY,
    }).then(data => {
      if (data) {
        apitoken = data.password;
      } else apitoken = '';
    });
    //return the token
    return apitoken;
}

//check login
export const isLoggedIn = async () => {
  let apiToken = await getAPIToken();
  if(apiToken.length > 0) return true;
  else return false;
}

//login handler
export const handleLogin = async (username: String, password: String) => {
  const API_URL = IP + '/api/authenticate';
  try {
    let response = await axios.post(API_URL, {
      username,
      password
    });
    //handle the response from API
    let apiToken = await response.data;
    let { token } = await apiToken;

    //for debugging
    console.log(apiToken);

    //save the api token 
    await Keychain.setGenericPassword('apiToken', token, {
      service: SECURE_KEY,
    });
  } catch (error) {
    console.error(error);
  }
};

//logout handler
export const handleLogout = async () => {
  try{
    //clear api token in server
    let apiToken = await getAPIToken();
    let apiUrl = IP + '/api/logout';
    let config = {
      headers: { Authorization: `Bearer ${apiToken}` }
    };
    let response = await axios.post(apiUrl,'',config);
    console.log(response.data);

    //clear api token from the keychain front end
    await Keychain.resetGenericPassword({
      service: SECURE_KEY,
    });
  } catch(error) {
    console.error(error);
  }
}