import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { RootStackParamList } from "../types";
import { ActivityIndicator } from "react-native";
import { linking } from "./Linking";
import Home from "../screens/Home";
import AudioManagement from "../screens/Audio";
import StoryDetail from "../screens/StoryDetail";
import IconStory from "../screens/Story/IconStory";
import StaticStory from "../screens/Story/StaticStory";
import SavedStory from "../screens/SavedStory";
import Login from "../screens/Login";
import UserPersonalInfo from "../screens/PersonalInfo";
import Test from "../screens/Test";
import AudioUploadScreen from "../screens/Audio/AudioUpload";
import TextUploadScreen from "../screens/Audio/TextUpload";
import StoryList from "../screens/StoryList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppStackNavigatior() {
  return (
    <NavigationContainer linking={linking} fallback={<ActivityIndicator ></ActivityIndicator>}>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false, orientation: 'portrait' }}
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
          name='StaticStory'
          component={gestureHandlerRootHOC(StaticStory)}
          options={{ headerShown: false, orientation: 'landscape' }}
        />
        <Stack.Screen
          name='SavedStory'
          component={SavedStory}
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
          name='AudioUpload'
          component={AudioUploadScreen}
          options={{ headerShown: false, title: 'Upload audio', orientation: 'portrait' }}
        />
        <Stack.Screen
          name='TextUpload'
          component={TextUploadScreen}
          options={{ headerShown: false, title: 'Upload text', orientation: 'portrait' }}
        />
        <Stack.Screen
          name='StoryList'
          component={StoryList}
          options={{ headerShown: false, title: 'Story List', orientation: 'landscape' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}