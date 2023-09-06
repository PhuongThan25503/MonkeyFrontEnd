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

//refresg token function
export const refreshToken = async () => {
  console.log('refresh');
  const API_URL = IP + '/api/refresh-token';
  try {
    let apiToken = await getAPIToken();
    let config = {
      headers: { Authorization: `Bearer ${apiToken}` }
    };
    let response = await axios.post(API_URL, '', config);
    let data = await response.data;
    let {token} = await data; // take the token out of response data
    
    //save the api token 
    await Keychain.setGenericPassword('apitoken', token, {
      service: SECURE_KEY,
    });
  } catch (error) {
    console.log(error);
  }
}

//check login
export const isLoggedIn = async () => {
  let apiToken = await getAPIToken();
  const API_URL = IP + '/api/isLoggedIn';
  let config = {
    headers: { Authorization: `Bearer ${apiToken}` }
  };
  try {
    let response = await axios.post(API_URL, '', config);

    // invalid credentials
    if (response.status == 401) {
      return false;
    }
    else if (response.status == 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}

//login handler
export const handleLogin = async (username: string, password: string) => {
  const API_URL = IP + '/api/authenticate';
  try {
    let response = await axios.post(API_URL, {
      username,
      password
    });

    // invalid credentials
    if (response.status == 401) {
      //print out error
    }
    else if (response.status == 200) {
      //handle the response from API
      let apiToken = await response.data;
      let { token } = await apiToken;

      //for debugging
      console.log(apiToken);

      //save the api token 
      await Keychain.setGenericPassword('apitoken', token, {
        service: SECURE_KEY,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//logout handler
export const handleLogout = async () => {
  try {
    //clear api token in server
    let apiToken = await getAPIToken();
    let apiUrl = IP + '/api/logout';
    let config = {
      headers: { Authorization: `Bearer ${apiToken}` }
    };
    await axios.post(apiUrl, '', config);
    isLoggedIn().then(data => console.log(data));
    //clear api token from the keychain front end
    await Keychain.resetGenericPassword({
      service: SECURE_KEY,
    });
  } catch (error) {
    console.error(error);
  }
}