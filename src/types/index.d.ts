//root stacks list 
export type RootStackParamList= {
  Home: undefined;
  Story: undefined;
  Login: undefined;
  Audio: undefined;
  UserPersonalInfo: undefined;
  StoryDetail: {id:number};
  Test: undefined;
  History: undefined;
  AudioUpload: undefined;
  TextUpload: undifined;
  IconStory:undefined;
  StoryList:undefined;
  StaticStory: undefined;
  SavedStory: undefined;
  Setting: undefined;
  StarWine: undefined;
}
export type StackNavProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
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

/**
 * type define here
 */

export type touchableData = {
  path: string,
  data: number[]
}

export type textConfig = {
  width: number;
  x: number,
  y: number,
  rotate: number,
}

export type touchableMediaData = {
  text: string,
  audio: string
  config: textConfig,
}

export type mainText = {
  text: string[],
  audio: string,
  syncData: syncData[],
  duration: number,
}

export type syncData = {
  e: number,
  s: number,
  w: string
}

export type audioData = {
  text: number,
  audio: string,
  syncData: string,
  duration: number,
}

export type BasicStoryInfo = {
  story_id : number,
  type_id : number,
  thumbnail: string,
  name: string
}