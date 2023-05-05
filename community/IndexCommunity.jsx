import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CommunityHome } from "./CommunityHome";
import { TalkSetting } from "./TalkSetting";
import { TalkRoom } from "./TalkRoom";
import { CommunityCreate } from "./CommunityCreate";
import { FollowerList } from "./FollowerList";

const Stack = createNativeStackNavigator();

export const IndexCommunity = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="CommunityHome" component={CommunityHome} options={{headerShown:false}}/>
        <Stack.Screen name="TalkRoom" component={TalkRoom} options={{headerShown:false}}/>
        <Stack.Screen name="TalkSetting" component={TalkSetting} options={{headerShown:false}}/>
        <Stack.Screen name="FollowerList" component={FollowerList} options={{headerShown:false}}/>
        <Stack.Screen name="CommunityCreate" component={CommunityCreate} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}