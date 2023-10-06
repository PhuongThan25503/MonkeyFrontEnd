import { NavigationContainer } from "@react-navigation/native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Home from "../screens/Home";
import Story from "../screens/Story";
import Audio from "../screens/Audio/Audio";
import StoryDetail from "../screens/StoryDetail/index";
import Login from "../screens/Login";
import UserPersonalInfo from "../screens/UserPersonalInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Test from "../screens/Test";
import History from "../screens/History";
import AudioManagement from "../screens/Audio";
import AudioUploadScreen from "../screens/Audio/AudioUpload";
import TextUploadScreen from "../screens/Audio/TextUpload";
import IconStory from "../screens/IconStory";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppStackNavigatior() {
  return (
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
          options={{headerShown: false, orientation: 'landscape' }}
        />
        <Stack.Screen
          name='Audio'
          component={AudioManagement}
          options={{ orientation: 'portrait' }}
        />
        <Stack.Screen
          name='StoryDetail'
          component={gestureHandlerRootHOC(StoryDetail)}
          options={{ headerShown: false, orientation: 'landscape' }}
        />
        <Stack.Screen
          name='IconStory'
          component={gestureHandlerRootHOC(IconStory)}
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
          options={{ headerShown: false, title: 'Test', orientation: 'landscape' }}
        />
        <Stack.Screen
          name='History'
          component={History}
          options={{ headerShown: false, title: 'History', orientation: 'landscape' }}
        />
        <Stack.Screen
          name='AudioUpload'
          component={AudioUploadScreen}
          options={{ headerShown: false, title: 'Upload audio', orientation: 'portrait' }}
        />
        <Stack.Screen
          name='TextUpload'
          component={TextUploadScreen}
          options={{ headerShown: false, title: 'Upload text', orientation: 'portrait' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}