import { Text, TouchableOpacity, View } from "react-native"
import { SearchButtonStyle } from "./style"
import { SimpleMarker, getAllMarker } from "../../ultis/getDataHelper"

type Props = {
  apiUrl: string
  setListOfMarker: (data: SimpleMarker[]) => void
  setIsDisplay: (state: boolean) => void
}

export default function SearchButton({setIsDisplay, setListOfMarker, apiUrl }: Props) {
  const searchHandler = async (apiUrl:string) => {
    const marker = await getAllMarker(apiUrl);
    setListOfMarker(marker);
    setIsDisplay(false);
  }
  return (
    <TouchableOpacity onPress={() => searchHandler(apiUrl)}>
      <View style={SearchButtonStyle.boxWrap}>
        <View style={SearchButtonStyle.boxSubWrap}>
          <Text style={SearchButtonStyle.text}>
            Search
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}