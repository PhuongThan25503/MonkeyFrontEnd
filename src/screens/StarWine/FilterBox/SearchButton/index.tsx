import { Text, TouchableOpacity, View } from "react-native"

type Props = {
  onPress: () => void
}

export default function SearchButton ({onPress} : Props){
  return(
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>
          Search
        </Text>
      </View>
    </TouchableOpacity>
  )
}