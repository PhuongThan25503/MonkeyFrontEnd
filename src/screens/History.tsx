import { Button, View } from "react-native";

export default function History() {
  const sendNotification = () => {
    
  }
  return(
    <View>
      <Button title="Send me notification" onPress={() => sendNotification()}></Button>
    </View>
  )
}