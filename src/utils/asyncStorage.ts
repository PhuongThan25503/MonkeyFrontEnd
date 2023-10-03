import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAsyncData = async (key: string, value:any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Data saved successfully!');
  } catch (error) {
    console.log(error);
  }
};


export const getAsyncData = async (key : string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    console.log(error);
  }
  return '';
};