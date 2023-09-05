import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { StoryDetailStyle } from './styles/StoryDetailStyle';

interface RouteParams {
  id: number;
}

interface Route {
  params: RouteParams;
}

function StoryDetail({ route } : {route: Route}) {
  return(
    <SafeAreaView>
      <Text style={StoryDetailStyle.text}>
        {route.params.id}
      </Text>
    </SafeAreaView>
  );
}

export default StoryDetail;