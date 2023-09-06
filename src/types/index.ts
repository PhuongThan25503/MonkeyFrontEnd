//root stacks list 
export type RootStackParamList= {
  Home: undefined;
  Story: undefined;
  Login: undefined;
  Audio: undefined;
  UserPersonalInfo: undefined;
  StoryDetail: undefined;
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

//story information
export type StoryInterface = {
  story_id: number,
  author_id: number,
  type_id: number,
  name: string,
  thumbnail: string,
  coin: number,
  isActive: boolean,
  created_at: string,
  updated_at: string,
}

//audio information
export type AudioInterface = {
  audio_id: number,
  audio: string,
  textId: number,
  text: string,
}

//page information
export type PageInterface = {
  page_id: number,
  story_id: number,
  background: string,
  page_num: number,
}