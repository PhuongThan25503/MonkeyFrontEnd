export type StoryData = {
  page: number,
  image: string,
  text: MainText[],
  touchable: Touchable[],
  iconList: Icon[],
  detailImage: DetailImage,
}

export type DetailImage ={
  position: [a: number, b: number],
  size: [a: number, b: number],
  image: string,
}

export type MainText = {
  text: string[],
  position: number,
  audio: string,
  syncData: SyncData[],
  duration: number
}

export type SyncData={
  s: number,
  e:number,
  w: string,
}

export type Touchable={
  text: string,
  audio: string,
  config: any,
  verticles: [[a:number, b:number]],
}

export type Icon={
  image_width: number,
  image_height: number,
  word: string,
  image: string,
  sound: string
}