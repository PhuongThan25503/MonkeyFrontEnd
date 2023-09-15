import { NavigationContainer } from "@react-navigation/native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Home from "../screens/Home";
import Story from "../screens/Story";
import Audio from "../screens/Audio";
import StoryDetail from "../screens/StoryDetail";
import Login from "../screens/Login";
import UserPersonalInfo from "../screens/UserPersonalInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Test from "../screens/Test";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppStackNavigatior(){
  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{ headerShown: false, orientation: 'portrait' }}
          />
          <Stack.Screen
            name='Story'
            component={Story}
            options={{ orientation: 'landscape' }}
          />
          <Stack.Screen
            name='Audio'
            component={Audio}
            options={{ orientation: 'portrait' }}
          />
          <Stack.Screen
            name='StoryDetail'
            component={gestureHandlerRootHOC(StoryDetail)}
            options={{ headerShown: false, orientation: 'landscape' }}
          />

          <Stack.Screen
            name='Login'
            component={Login}
            options={{ orientation: 'portrait' }}
          />
          <Stack.Screen
            name='UserPersonalInfo'
            component={UserPersonalInfo}
            options={{ title: 'Personal info', orientation: 'portrait' }}
          />
          <Stack.Screen
            name='Test'
            component={Test}
            options={{ title: 'Test', orientation: 'portrait' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}