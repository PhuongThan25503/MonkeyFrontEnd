import { useState, useEffect } from 'react';

import { getAPIToken } from './authenticate';
import { IP} from '../config';
import axios from 'axios';
import { User } from '../types';

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

