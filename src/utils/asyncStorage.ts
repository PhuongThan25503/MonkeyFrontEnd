import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAsyncData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getAsyncData = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    return value;
  }
  return '';
};

export const pushAsyncStorage = async (key: string, element: any) =>{
  await AsyncStorage.getItem(key)
  .then((value) => {
    if(value !== null){
      const storyArray = JSON.parse(value);
      storyArray.push(element);
      AsyncStorage.setItem('story', JSON.stringify(storyArray));
    }
  })
  .catch((error) => console.log(error));
}

export const isKeyExist = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.log(error);
  }
};