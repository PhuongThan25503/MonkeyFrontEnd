import { useState, useEffect } from 'react';

import { getAPIToken } from '../utils/api';
import { IP, SECURE_KEY } from '../config';
import axios from 'axios';
import { User } from '../types';
import * as Keychain from 'react-native-keychain';

//defaut information for user
export const defaultUser: User = {
  id: 0,
  fullname: 'N/A',
  phone: 'N/A',
  email: 'N/A',
  address: 'N/A',
}

//promise object for getting an user
export const getUserInfo = async (): Promise<User> => {
  try {
    let api_token = await getAPIToken();
    let apiUrl = IP + '/api/getPersonalInfo';
    let config = {
      headers: { Authorization: `Bearer ${api_token}` }
    }
    // await axios.post(apiUrl, '', config)
    //   .then(response => { return (response.data) });
    let response = await axios.post(apiUrl, '', config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return defaultUser
}

//custom hook for getting an user
export const useGetUserInfo = (): User => {
  const [userInfo, setUserInfo] = useState(defaultUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api_token = await getAPIToken();
        let apiUrl = IP + '/api/getPersonalInfo';
        let config = {
          headers: { Authorization: `Bearer ${api_token}` }
        }
        let response = await axios.post(apiUrl, '', config);
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return userInfo;
};

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
