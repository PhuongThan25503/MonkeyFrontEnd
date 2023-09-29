import { Text, TextInput, View } from "react-native";
import AudioFormStyles from "./Style";

export default function InputItem({label, error, value, handleChange, handleBlur, target} : any) {
  return (
    <View>
      <View style={AudioFormStyles.textBox}>
        <Text style={AudioFormStyles.text}>{label}</Text>
        {error &&
          <Text style={{ fontSize: 10, color: 'red' }}>{error}</Text>
        }
      </View>

      <TextInput
        style={AudioFormStyles.input}
        onChangeText={handleChange(target)}
        onBlur={handleBlur(target)}
        value={value}
      />
    </View>
  )
}