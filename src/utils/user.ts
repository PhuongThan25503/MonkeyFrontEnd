import { getAPIToken } from '../utils/api';
import { IP } from '../config';
import axios from 'axios';
import { User } from '../types';

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

export const defaultUser: User = {
  id: 0,
  fullname: 'N/A',
  phone: 'N/A',
  email: 'N/A',
  address: 'N/A',
}