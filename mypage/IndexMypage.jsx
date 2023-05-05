import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MypageHome } from "./MypageHome";
import { EditMypage } from "./EditMypage";
import { Title } from "./Title";
import { Record } from "./Record";
import { TitlePost } from "./TitlePost";


const Stack = createNativeStackNavigator();

export const IndexMypage = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="MypageHome" component={MypageHome} options={{headerShown:false}}/>
        <Stack.Screen name="EditMypage" component={EditMypage} options={{headerShown:false}}/>
        <Stack.Screen name="Title" component={Title} options={{headerShown:false}}/>
        <Stack.Screen name="Record" component={Record} options={{headerShown:false}}/>
        <Stack.Screen name="TitlePost" component={TitlePost} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}