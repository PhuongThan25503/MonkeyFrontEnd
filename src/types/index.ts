//root stacks list 
export type RootStackParamList= {
  Home: undefined;
  Login: undefined;
  UserPersonalInfo: undefined;
}

//user credentials 
export type UserCredential = {
  username: string;
  password: string;
}

//user informations
export type User = {
  id: number,
  fullname: string,
  phone: string,
  email: string,
  address: string, 
}